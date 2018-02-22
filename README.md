# estimate-calculator

> Small library to calculate and compare SLAs' shippingEstimate

## Install

```sh
$ npm install @vtex/estimate-calculator
```

## Usage

```js
const estimateCalculator = require('@vtex/estimate-calculator')

estimateCalculator.getFastestSla([
        { id: 1, shippingEstimate: '50bd' },
        { id: 2, shippingEstimate: '15bd' },
        { id: 3, shippingEstimate: '100bd' },
])
// { id: 2, shippingEstimate: '15bd' }

```
## API

### getShippingEstimateQuantityInSeconds(estimate)

Returns shippingEstimate converted to seconds

#### estimate

Type: `String`

shippingEstimate of a given SLA

### getLatestSla(slas)

Returns the SLA that will take the most time (i.e: worst-case scenario in a shippingEstimate context)

#### slas

Type: `Array`

List of SLAS

### getFastestSla(slas)

Returns the SLA that will be fastest one (i.e: best-case scenario in a shippingEstimate context)

#### slas

Type: `Array`

List of SLAS

### getCheapestSla(slas)

Returns the chepeast SLA

#### slas

Type: `Array`

List of SLAS

### selectCheapestSlaForAllItems(logisticsInfo)

Returns the chepeast SLA for all items

#### logisticsInfo

Type: `Object`

Object that contains all the logistics information of an order

### selectFastestSlaForAllItems(logisticsInfo)

Returns the fastest SLA for all items

#### logisticsInfo

Type: `Array`

Array that contains all the logistics information of each item of the order

Format of the Array: 
```js
[
      {
        itemIndex: 0,
        selectedSla: '',
        selectedDeliveryChannel: '',
        addressId: '62e1db5500824a66bcef708d09388a8e',
        slas: [[Object], [Object]],
        shipsTo: ['BRA'],
        itemId: '100006784',
        deliveryChannels: [[Object], [Object]],
      },
      {
        itemIndex: 1,
        selectedSla: '',
        selectedDeliveryChannel: '',
        addressId: '62e1db5500824a66bcef708d09388a8e',
        slas: [[Object], [Object]],
        shipsTo: ['BRA'],
        itemId: '100006786',
        deliveryChannels: [[Object], [Object]],
      },
      {
        itemIndex: 2,
        selectedSla: '',
        selectedDeliveryChannel: '',
        addressId: '62e1db5500824a66bcef708d09388a8e',
        slas: [[Object], [Object]],
        shipsTo: ['BRA'],
        itemId: '100006785',
        deliveryChannels: [[Object], [Object]],
      },
]
```
#### Examples

```js

estimateCalculator.getShippingEstimateQuantityInSeconds('10m')
// 600

estimateCalculator.getLatestSla([
  { id: 1, shippingEstimate: '50h' },
  { id: 2, shippingEstimate: '15h' },
  { id: 3, shippingEstimate: '100h' },
])
// { id: 3, shippingEstimate: '100h' }        

estimateCalculator.getFastestSla([
  { id: 1, shippingEstimate: '50h' },
  { id: 2, shippingEstimate: '15h' },
  { id: 3, shippingEstimate: '100h' },
])
 // { id: 2, shippingEstimate: '15h' }

estimateCalculator.getCheapestSla([
  { id: 1, price: 50 },
  { id: 2, price: 15 },
  { id: 3, price: 100 },
])
// { id: 2, price: 15 }  

estimateCalculator.selectCheapestSlaForAllItems(logistiscsInfo)

// [
//   {
//     selectedSla: '',
//     selectedDeliveryChannel: '',
//     itemIndex: 0,
//     addressId: '62e1db5500824a66bcef708d09388a8e',
//     slas: [
//       {
//         id: 'Normal',
//         deliveryChannel: 'delivery',
//         name: 'Normal',
//         deliveryIds: [[Object]],
//         shippingEstimate: '16bd',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 334,
//         listPrice: 334,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//       {
//         id: 'Expressa',
//         deliveryChannel: 'delivery',
//         name: 'Expressa',
//         deliveryIds: [[Object]],
//         shippingEstimate: '2d',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 6666,
//         listPrice: 6666,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//     ],
//     shipsTo: ['BRA'],
//     itemId: '100006784',
//     deliveryChannels: [[Object], [Object]],
//   },
//   {
//     selectedSla: '',
//     selectedDeliveryChannel: '',
//     itemIndex: 1,
//     addressId: '62e1db5500824a66bcef708d09388a8e',
//     slas: [
//       {
//         id: 'Normal',
//         deliveryChannel: 'delivery',
//         name: 'Normal',
//         deliveryIds: [[Object]],
//         shippingEstimate: '16bd',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 333,
//         listPrice: 333,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//       {
//         id: 'Expressa',
//         deliveryChannel: 'delivery',
//         name: 'Expressa',
//         deliveryIds: [[Object]],
//         shippingEstimate: '2d',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 6667,
//         listPrice: 6667,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//     ],
//     shipsTo: ['BRA'],
//     itemId: '100006786',
//     deliveryChannels: [[Object], [Object]],
//   },
//   {
//     selectedSla: '',
//     selectedDeliveryChannel: '',
//     itemIndex: 2,
//     addressId: '62e1db5500824a66bcef708d09388a8e',
//     slas: [
//       {
//         id: 'Normal',
//         deliveryChannel: 'delivery',
//         name: 'Normal',
//         deliveryIds: [[Object]],
//         shippingEstimate: '16bd',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 333,
//         listPrice: 333,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//       {
//         id: 'Expressa',
//         deliveryChannel: 'delivery',
//         name: 'Expressa',
//         deliveryIds: [[Object]],
//         shippingEstimate: '2d',
//         shippingEstimateDate: null,
//         lockTTL: null,
//         availableDeliveryWindows: [],
//         deliveryWindow: null,
//         price: 6667,
//         listPrice: 6667,
//         tax: 0,
//         pickupStoreInfo: {
//           isPickupStore: false,
//           friendlyName: null,
//           address: null,
//           additionalInfo: null,
//           dockId: null,
//         },
//       },
//     ],
//     shipsTo: ['BRA'],
//     itemId: '100006785',
//     deliveryChannels: [[Object], [Object]],
//   },
// ]

estimateShipping.selectFastestSlaForAllItems(logisticsInfo)

//   [
//     {
//       selectedSla: '',
//       selectedDeliveryChannel: '',
//       itemIndex: 0,
//       addressId: '62e1db5500824a66bcef708d09388a8e',
//       slas: [
//         {
//           id: 'Normal',
//           deliveryChannel: 'delivery',
//           name: 'Normal',
//           deliveryIds: [[Object]],
//           shippingEstimate: '16bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 334,
//           listPrice: 334,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//         {
//           id: 'Expressa',
//           deliveryChannel: 'delivery',
//           name: 'Expressa',
//           deliveryIds: [[Object]],
//           shippingEstimate: '1bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 6666,
//           listPrice: 6666,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//       ],
//       shipsTo: ['BRA'],
//       itemId: '100006784',
//       deliveryChannels: [[Object], [Object]],
//     },
//     {
//       selectedSla: '',
//       selectedDeliveryChannel: '',
//       itemIndex: 1,
//       addressId: '62e1db5500824a66bcef708d09388a8e',
//       slas: [
//         {
//           id: 'Normal',
//           deliveryChannel: 'delivery',
//           name: 'Normal',
//           deliveryIds: [[Object]],
//           shippingEstimate: '16bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 333,
//           listPrice: 333,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//         {
//           id: 'Expressa',
//           deliveryChannel: 'delivery',
//           name: 'Expressa',
//           deliveryIds: [[Object]],
//           shippingEstimate: '1bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 6667,
//           listPrice: 6667,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//       ],
//       shipsTo: ['BRA'],
//       itemId: '100006786',
//       deliveryChannels: [[Object], [Object]],
//     },
//     {
//       selectedSla: '',
//       selectedDeliveryChannel: '',
//       itemIndex: 2,
//       addressId: '62e1db5500824a66bcef708d09388a8e',
//       slas: [
//         {
//           id: 'Normal',
//           deliveryChannel: 'delivery',
//           name: 'Normal',
//           deliveryIds: [[Object]],
//           shippingEstimate: '16bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 333,
//           listPrice: 333,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//         {
//           id: 'Expressa',
//           deliveryChannel: 'delivery',
//           name: 'Expressa',
//           deliveryIds: [[Object]],
//           shippingEstimate: '1bd',
//           shippingEstimateDate: null,
//           lockTTL: null,
//           availableDeliveryWindows: [],
//           deliveryWindow: null,
//           price: 6667,
//           listPrice: 6667,
//           tax: 0,
//           pickupStoreInfo: {
//             isPickupStore: false,
//             friendlyName: null,
//             address: null,
//             additionalInfo: null,
//             dockId: null,
//           },
//         },
//       ],
//       shipsTo: ['BRA'],
//       itemId: '100006785',
//       deliveryChannels: [[Object], [Object]],
//     },
//   ]

```
