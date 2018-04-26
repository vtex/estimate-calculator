import endsWith from 'lodash/endsWith'
import reject from 'lodash/reject'
import convertBusinnesDaysToDays from './businessDays'

const SHIPPING_ESTIMATE_UNITS = {
  BUSINESS_DAYS: 'bd',
  DAYS: 'd',
  HOURS: 'h',
  MINUTES: 'm',
}

const MIN = 60 // in seconds
const HOUR = 60 * MIN
const DAY = 24 * HOUR

const SHIPPING_ESTIMATE_IN_SECONDS = {
  [SHIPPING_ESTIMATE_UNITS.BUSINESS_DAYS]: DAY,
  [SHIPPING_ESTIMATE_UNITS.DAYS]: DAY,
  [SHIPPING_ESTIMATE_UNITS.HOURS]: HOUR,
  [SHIPPING_ESTIMATE_UNITS.MINUTES]: MIN,
}

function getLatestSla(slas) {
  return getGreaterSla(slas, sla =>
    getShippingEstimateQuantityInSeconds(sla.shippingEstimate)
  )
}

function getCheapestSla(slas) {
  return getLowerSla(slas, sla => sla.price)
}

function getLowerSla(slas, lowerComparator) {
  if (!slas || slas.length === 0) {
    return null
  }

  let lowerSla = slas[0]
  let lowerCriteria = lowerComparator(lowerSla)
  slas.forEach(sla => {
    const currentCriteria = lowerComparator(sla)
    if (currentCriteria < lowerCriteria) {
      lowerCriteria = currentCriteria
      lowerSla = sla
    }
  })

  return lowerSla
}

function selectCheapestSlaForAllItems(logisticsInfo) {
  if (!logisticsInfo || logisticsInfo.length === 0) {
    return null
  }

  const newLogisticsInfo = logisticsInfo.map(item => {
    const filteredSlas = excludePickupOptionsFromItemSlas(item.slas)

    if (!filteredSlas || filteredSlas.length === 0) {
      return item
    }

    const cheapestSla = getCheapestSla(filteredSlas)

    return Object.assign({}, item, {
      slas: item.slas,
      selectedSla: cheapestSla.id,
      selectedDeliveryChannel: cheapestSla.deliveryChannel,
    })
  })
  return newLogisticsInfo
}

function selectFastestSlaForAllItems(logisticsInfo) {
  if (!logisticsInfo || logisticsInfo.length === 0) {
    return null
  }

  const newLogisticsInfo = logisticsInfo.map(item => {
    const filteredSlas = excludePickupOptionsFromItemSlas(item.slas)

    if (!filteredSlas || filteredSlas.length === 0) {
      return item
    }

    const fastestSla = getFastestSla(filteredSlas)

    return Object.assign({}, item, {
      slas: item.slas,
      selectedSla: fastestSla.id,
      selectedDeliveryChannel: fastestSla.deliveryChannel,
    })
  })
  return newLogisticsInfo
}

function excludePickupOptionsFromItemSlas(slas) {
  return reject(slas, sla => sla.pickupStoreInfo.isPickupStore)
}

function getFastestSla(slas) {
  return getLowerSla(slas, sla =>
    getShippingEstimateQuantityInSeconds(sla.shippingEstimate)
  )
}

function getGreaterSla(slas, greaterComparator) {
  if (!slas || slas.length === 0) {
    return null
  }

  let greaterSla = slas[0]
  let greaterCriteria = greaterComparator(greaterSla)
  slas.forEach(sla => {
    const currentCriteria = greaterComparator(sla)
    if (currentCriteria > greaterCriteria) {
      greaterCriteria = currentCriteria
      greaterSla = sla
    }
  })

  return greaterSla
}

function getShippingEstimateQuantityInSeconds(estimate) {
  if (estimate === undefined || estimate === null || estimate === '') {
    return null
  }

  const unit = getShippingEstimateUnit(estimate)
  let quantity = getShippingEstimateQuantity(estimate)
  if (unit === 'bd') {
    quantity = convertBusinnesDaysToDays(quantity)
  }
  const multiplierToSeconds = SHIPPING_ESTIMATE_IN_SECONDS[unit]
  const quantityInSeconds = quantity * multiplierToSeconds
  return quantityInSeconds
}

function getShippingEstimateQuantity(estimate) {
  const unit = getShippingEstimateUnit(estimate)
  const quantityText = estimate.replace(unit, '')
  return quantityText ? parseInt(quantityText, 10) : 0
}

function getShippingEstimateUnit(estimate) {
  let estimateUnit = 'bd'
  Object.keys(SHIPPING_ESTIMATE_UNITS).forEach(unitKey => {
    const unit = SHIPPING_ESTIMATE_UNITS[unitKey]
    if (endsWith(estimate, unit)) {
      const quantityText = estimate.replace(unit, '')
      // no letters
      if (parseInt(quantityText, 10).toString() === quantityText) {
        estimateUnit = unit
      }
    }
  })
  return estimateUnit
}

module.exports = {
  getShippingEstimateQuantityInSeconds,
  getLatestSla,
  getFastestSla,
  getCheapestSla,
  selectCheapestSlaForAllItems,
  selectFastestSlaForAllItems,
}
