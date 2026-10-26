/**
 * Demonstration vehicle dataset.
 *
 * IMPORTANT: every listing below is fictional sample data created for the
 * AutoVault Motors concept project. Nothing here represents live inventory,
 * a verified market price, or a vehicle that can be purchased. Imagery is
 * generated for the concept (see public/images/CREDITS.md).
 *
 * The list is grouped by make so that each brand has a deep, browsable
 * selection: ten listings per make, with at least one of them featured.
 * To replace this with real inventory, keep the `Vehicle` shape and swap the
 * entries — every page, filter, comparison view and meta tag reads from here.
 */

import type { GalleryView, Vehicle, VehicleImage } from "@/types/vehicle";

const baseVehicles: Vehicle[] = [
  /* ───────────────────────────── Toyota (10) ───────────────────────────── */
  {
    id: "av-1001",
    slug: "toyota-camry-2021",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 22_500_000,
    mileage: 48_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "2.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2021 Toyota Camry in silver with a 2.5-litre petrol engine and automatic transmission. The listing records 48,000 km and a black leather interior, and is presented here to show how a mid-size saloon would be described on the site.",
    features: [
      "Black leather seats",
      "Reverse camera",
      "Cruise control",
      "Dual-zone air conditioning",
      "Keyless entry and push-button start",
      "Apple CarPlay and Android Auto",
      "LED headlights",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-camry-2021-1.jpg",
        alt: "2021 Toyota Camry saloon photographed from the front three-quarter angle in a dark studio",
      },
      {
        src: "/images/vehicles/toyota-camry-2021-2.jpg",
        alt: "Rear three-quarter view of the silver 2021 Toyota Camry showing the tail lights",
        view: "back",
      },
      {
        src: "/images/vehicles/toyota-camry-2021-3.jpg",
        alt: "Interior of the 2021 Toyota Camry showing the dashboard and front seats",
        view: "inside",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1001",
  },
  {
    id: "av-1002",
    slug: "toyota-corolla-2019",
    make: "Toyota",
    model: "Corolla",
    year: 2019,
    price: 14_800_000,
    mileage: 76_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.8L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2019 Toyota Corolla in white, listed with a 1.8-litre petrol engine, automatic transmission and 76,000 km. A straightforward compact saloon entry that demonstrates a lower price band in the inventory.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "Keyless entry",
      "16-inch alloy wheels",
      "Rear parking sensors",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-corolla-2019-1.jpg",
        alt: "2019 Toyota Corolla saloon in white, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1002",
  },
  {
    id: "av-1003",
    slug: "toyota-rav4-2020",
    make: "Toyota",
    model: "RAV4",
    year: 2020,
    price: 27_900_000,
    mileage: 39_500,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.5L",
    exteriorColour: "Graphite Grey",
    availableColours: [
      { name: "Graphite Grey", hex: "#4b5054" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2020 Toyota RAV4 in graphite grey with all-wheel drive, a 2.5-litre petrol engine and 39,500 km on the listing. Positioned as the mid-range family SUV in this sample inventory.",
    features: [
      "All-wheel drive",
      "Reverse camera",
      "Adaptive cruise control",
      "Power tailgate",
      "Dual-zone air conditioning",
      "Apple CarPlay and Android Auto",
      "18-inch alloy wheels",
      "Blind spot monitoring",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-rav4-2020-1.jpg",
        alt: "2020 Toyota RAV4 SUV in graphite grey, front three-quarter view",
      },
      {
        src: "/images/vehicles/toyota-rav4-2020-2.jpg",
        alt: "Interior of the 2020 Toyota RAV4 showing the dashboard screen and front seats",
        view: "inside",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1003",
  },
  {
    id: "av-1010",
    slug: "toyota-highlander-2015",
    make: "Toyota",
    model: "Highlander",
    year: 2015,
    price: 19_800_000,
    mileage: 112_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2015 Toyota Highlander in black with a 3.5-litre V6 petrol engine and seven seats, recorded at 112,000 km. This listing is marked as reserved to demonstrate how the site communicates availability.",
    features: [
      "Seven seats",
      "Leather seats",
      "Reverse camera",
      "Tri-zone air conditioning",
      "Power tailgate",
      "Sunroof",
      "19-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-highlander-2015-1.jpg",
        alt: "2015 Toyota Highlander SUV in black, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Reserved",
    stockNumber: "AV-1010",
  },
  {
    id: "av-1011",
    slug: "toyota-hilux-2021",
    make: "Toyota",
    model: "Hilux",
    year: 2021,
    price: 38_500_000,
    mileage: 54_000,
    transmission: "Manual",
    fuelType: "Diesel",
    bodyStyle: "Pickup",
    condition: "Nigerian Used",
    engineCapacity: "2.4L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2021 Toyota Hilux double cab in white with a 2.4-litre diesel engine and manual transmission, listed at 54,000 km. Included to show a pickup body style and a manual gearbox in the filter set.",
    features: [
      "Double cab",
      "Four-wheel drive",
      "Reverse camera",
      "Bed liner",
      "Air conditioning",
      "Bluetooth audio",
      "Side steps",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-hilux-2021-1.jpg",
        alt: "2021 Toyota Hilux double cab pickup in white, front three-quarter view",
      },
      {
        src: "/images/vehicles/toyota-hilux-2021-2.jpg",
        alt: "Side and rear view of the white 2021 Toyota Hilux pickup showing the load bed",
        view: "back",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1011",
  },
  {
    id: "av-1012",
    slug: "toyota-prado-2017",
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2017,
    price: 34_900_000,
    mileage: 96_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.7L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2017 Toyota Land Cruiser Prado in grey with a 2.7-litre petrol engine, recorded at 96,000 km. The listing is marked sold so the interface can show a completed sale.",
    features: [
      "Seven seats",
      "Leather seats",
      "Reverse camera",
      "Sunroof",
      "Dual-zone air conditioning",
      "Roof rails",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-prado-2017-1.jpg",
        alt: "2017 Toyota Land Cruiser Prado SUV in grey, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Sold",
    stockNumber: "AV-1012",
  },
  {
    id: "av-1013",
    slug: "toyota-corolla-2021",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 21_900_000,
    mileage: 41_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Blue",
    availableColours: [
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2021 Toyota Corolla in blue with a 2.0-litre petrol engine and automatic transmission, recorded at 41,000 km. The newer generation saloon, included to show how two model years of the same name differ in price.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Lane departure alert",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "16-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-corolla-2019-1.jpg",
        alt: "Toyota Corolla saloon photographed in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1013",
  },
  {
    id: "av-1014",
    slug: "toyota-avalon-2016",
    make: "Toyota",
    model: "Avalon",
    year: 2016,
    price: 17_400_000,
    mileage: 104_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "3.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2016 Toyota Avalon in black with a 3.5-litre V6 petrol engine, recorded as Nigerian used with 104,000 km. A roomy full-size saloon that adds a distinct model to the Toyota selection.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Sunroof",
      "Dual-zone air conditioning",
      "Bluetooth audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-camry-2021-1.jpg",
        alt: "Dark studio photograph of a large Toyota saloon, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1014",
  },
  {
    id: "av-1015",
    slug: "toyota-yaris-2018",
    make: "Toyota",
    model: "Yaris",
    year: 2018,
    price: 9_850_000,
    mileage: 68_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Hatchback",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2018 Toyota Yaris hatchback in white with a 1.5-litre petrol engine and 68,000 km on the listing. The smallest and least expensive entry in the dataset, useful for showing a first-car budget.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "Keyless entry",
      "15-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-corolla-2019-1.jpg",
        alt: "White compact Toyota hatchback in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1015",
  },
  {
    id: "av-1016",
    slug: "toyota-sienna-2019",
    make: "Toyota",
    model: "Sienna",
    year: 2019,
    price: 28_600_000,
    mileage: 73_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Minivan",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2019 Toyota Sienna in silver with a 3.5-litre V6 petrol engine and eight seats, recorded at 73,000 km. Included so the inventory covers a family minivan as well as saloons and SUVs.",
    features: [
      "Eight seats",
      "Leather seats",
      "Sliding side doors",
      "Reverse camera",
      "Tri-zone air conditioning",
      "Power tailgate",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-sienna-2019-1.jpg",
        alt: "2019 Toyota Sienna minivan in silver, front three-quarter view",
      },
      {
        src: "/images/vehicles/toyota-sienna-2019-2.jpg",
        alt: "Rear three-quarter view of the silver 2019 Toyota Sienna showing the tailgate",
        view: "back",
      },
      {
        src: "/images/vehicles/toyota-sienna-2019-4.jpg",
        alt: "Interior of the 2019 Toyota Sienna showing captain chairs and the dashboard screen",
        view: "inside",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1016",
  },

  /* ────────────────────────────── Lexus (10) ────────────────────────────── */
  {
    id: "av-1004",
    slug: "lexus-rx-350-2018",
    make: "Lexus",
    model: "RX 350",
    year: 2018,
    price: 32_000_000,
    mileage: 62_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2018 Lexus RX 350 in black with a 3.5-litre V6 petrol engine and automatic transmission. The sample listing records 62,000 km and a tan leather interior.",
    features: [
      "Tan leather seats",
      "Power front seats with memory",
      "Reverse camera",
      "Sunroof",
      "Power tailgate",
      "Mark Levinson audio",
      "LED headlights",
      "19-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-rx-350-2018-1.jpg",
        alt: "2018 Lexus RX 350 SUV in black, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1004",
  },
  {
    id: "av-1005",
    slug: "lexus-es-350-2020",
    make: "Lexus",
    model: "ES 350",
    year: 2020,
    price: 35_500_000,
    mileage: 34_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "Deep Blue",
    availableColours: [
      { name: "Deep Blue", hex: "#223e66" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2020 Lexus ES 350 in deep blue with a 3.5-litre V6 petrol engine and 34,000 km on the listing. Included to show how the detail page handles a higher-priced executive saloon.",
    features: [
      "Leather seats",
      "Heated and ventilated front seats",
      "Panoramic sunroof",
      "Reverse camera",
      "Adaptive cruise control",
      "Mark Levinson audio",
      "Wireless charging",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "2020 Lexus ES 350 executive saloon in deep blue, front three-quarter view",
      },
      {
        src: "/images/vehicles/lexus-es-350-2020-2.jpg",
        alt: "Rear three-quarter view of the deep blue 2020 Lexus ES 350 showing the tail lights",
        view: "back",
      },
      {
        src: "/images/vehicles/lexus-es-350-2020-3.jpg",
        alt: "Tan leather interior of the 2020 Lexus ES 350 with the dashboard screen",
        view: "inside",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1005",
  },
  {
    id: "av-1017",
    slug: "lexus-rx-350-2016",
    make: "Lexus",
    model: "RX 350",
    year: 2016,
    price: 24_800_000,
    mileage: 118_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Nigerian Used",
    engineCapacity: "3.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2016 Lexus RX 350 in white, recorded as Nigerian used with 118,000 km. The previous-generation body style, listed to show how age and condition move the price within one model name.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Sunroof",
      "Power tailgate",
      "Bluetooth audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-rx-350-2018-1.jpg",
        alt: "White Lexus RX SUV photographed in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1017",
  },
  {
    id: "av-1018",
    slug: "lexus-gx-460-2017",
    make: "Lexus",
    model: "GX 460",
    year: 2017,
    price: 41_500_000,
    mileage: 94_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "4.6L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2017 Lexus GX 460 in grey with a 4.6-litre V8 petrol engine and permanent four-wheel drive, recorded at 94,000 km. The most expensive SUV in the sample dataset.",
    features: [
      "Seven seats",
      "Leather seats",
      "Four-wheel drive",
      "Reverse camera",
      "Sunroof",
      "Roof rails",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-prado-2017-1.jpg",
        alt: "Grey boxy luxury SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1018",
  },
  {
    id: "av-1019",
    slug: "lexus-is-250-2015",
    make: "Lexus",
    model: "IS 250",
    year: 2015,
    price: 15_900_000,
    mileage: 101_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "2.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2015 Lexus IS 250 in silver with a 2.5-litre V6 petrol engine, recorded as Nigerian used with 101,000 km. A compact executive saloon that broadens the Lexus price range downwards.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Dual-zone air conditioning",
      "Bluetooth audio",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-c300-2016-1.jpg",
        alt: "Silver compact executive saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1019",
  },
  {
    id: "av-1020",
    slug: "lexus-lx-570-2015",
    make: "Lexus",
    model: "LX 570",
    year: 2015,
    price: 52_000_000,
    mileage: 132_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "5.7L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2015 Lexus LX 570 in black with a 5.7-litre V8 petrol engine and eight seats, recorded at 132,000 km. This listing is marked reserved so the site can demonstrate a premium vehicle awaiting collection.",
    features: [
      "Eight seats",
      "Leather seats",
      "Four-wheel drive",
      "Reverse camera",
      "Cool box",
      "Sunroof",
      "20-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-highlander-2015-1.jpg",
        alt: "Black full-size luxury SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Reserved",
    stockNumber: "AV-1020",
  },
  {
    id: "av-1021",
    slug: "lexus-es-350-2017",
    make: "Lexus",
    model: "ES 350",
    year: 2017,
    price: 23_700_000,
    mileage: 89_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2017 Lexus ES 350 in white with a 3.5-litre V6 petrol engine, recorded at 89,000 km. The earlier ES generation, shown alongside the 2020 listing to make model-year differences easy to compare.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Sunroof",
      "Dual-zone air conditioning",
      "Mark Levinson audio",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "White Lexus executive saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1021",
  },
  {
    id: "av-1022",
    slug: "lexus-nx-300-2019",
    make: "Lexus",
    model: "NX 300",
    year: 2019,
    price: 29_400_000,
    mileage: 56_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Graphite Grey",
    availableColours: [
      { name: "Graphite Grey", hex: "#4b5054" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2019 Lexus NX 300 in graphite grey with a turbocharged 2.0-litre petrol engine, recorded at 56,000 km. A compact luxury SUV that sits between the RX and the smaller Lexus range.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Power tailgate",
      "Dual-zone air conditioning",
      "Wireless charging",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-rav4-2020-1.jpg",
        alt: "Graphite grey compact luxury SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1022",
  },
  {
    id: "av-1023",
    slug: "lexus-ls-460-2014",
    make: "Lexus",
    model: "LS 460",
    year: 2014,
    price: 21_300_000,
    mileage: 148_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "4.6L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2014 Lexus LS 460 in black with a 4.6-litre V8 petrol engine, recorded as Nigerian used with 148,000 km. A long-wheelbase flagship saloon and the oldest listing in the dataset.",
    features: [
      "Leather seats",
      "Rear seat entertainment",
      "Powered front seats with memory",
      "Reverse camera",
      "Sunroof",
      "Mark Levinson audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "Black full-size luxury saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1023",
  },
  {
    id: "av-1024",
    slug: "lexus-ux-250h-2021",
    make: "Lexus",
    model: "UX 250h",
    year: 2021,
    price: 33_200_000,
    mileage: 27_000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Blue",
    availableColours: [
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2021 Lexus UX 250h in blue with a 2.0-litre self-charging hybrid powertrain, recorded at 27,000 km. The only hybrid listing, included so the fuel-type filter has more than petrol and diesel.",
    features: [
      "Hybrid powertrain",
      "Leather seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Power tailgate",
      "Wireless charging",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "Blue compact hybrid SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1024",
  },

  /* ────────────────────────────── Honda (10) ────────────────────────────── */
  {
    id: "av-1006",
    slug: "honda-accord-2017",
    make: "Honda",
    model: "Accord",
    year: 2017,
    price: 12_400_000,
    mileage: 98_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "2.4L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2017 Honda Accord in grey, recorded as Nigerian used with 98,000 km. The listing shows a 2.4-litre petrol engine and automatic transmission, and demonstrates the site's used-condition labelling.",
    features: [
      "Leather seats",
      "Reverse camera",
      "Air conditioning",
      "Cruise control",
      "Bluetooth audio",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-accord-2017-1.jpg",
        alt: "2017 Honda Accord saloon in grey, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1006",
  },
  {
    id: "av-1007",
    slug: "honda-crv-2019",
    make: "Honda",
    model: "CR-V",
    year: 2019,
    price: 18_900_000,
    mileage: 57_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2019 Honda CR-V in white with a turbocharged 1.5-litre petrol engine and 57,000 km on the sample listing. A practical compact SUV entry for the inventory grid.",
    features: [
      "Reverse camera",
      "Air conditioning",
      "Cruise control",
      "Keyless entry and push-button start",
      "Apple CarPlay and Android Auto",
      "Power tailgate",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-crv-2019-1.jpg",
        alt: "2019 Honda CR-V SUV in white, front three-quarter view",
      },
      {
        src: "/images/vehicles/honda-crv-2019-2.jpg",
        alt: "Rear three-quarter view of the white 2019 Honda CR-V showing the tailgate",
        view: "back",
      },
      {
        src: "/images/vehicles/honda-crv-2019-3.jpg",
        alt: "Interior of the 2019 Honda CR-V showing the dashboard and front seats",
        view: "inside",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1007",
  },
  {
    id: "av-1025",
    slug: "honda-civic-2018",
    make: "Honda",
    model: "Civic",
    year: 2018,
    price: 13_600_000,
    mileage: 64_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "Blue",
    availableColours: [
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2018 Honda Civic in blue with a turbocharged 1.5-litre petrol engine, recorded at 64,000 km. A compact saloon positioned between the Accord and the smaller Honda hatchback.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "16-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-civic-2018-1.jpg",
        alt: "2018 Honda Civic compact saloon in blue, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1025",
  },
  {
    id: "av-1026",
    slug: "honda-pilot-2017",
    make: "Honda",
    model: "Pilot",
    year: 2017,
    price: 26_800_000,
    mileage: 88_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2017 Honda Pilot in silver with a 3.5-litre V6 petrol engine and eight seats, recorded at 88,000 km. The largest Honda in the selection and a direct alternative to the Highlander.",
    features: [
      "Eight seats",
      "Leather seats",
      "Reverse camera",
      "Tri-zone air conditioning",
      "Power tailgate",
      "Sunroof",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-highlander-2015-1.jpg",
        alt: "Silver eight-seat SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1026",
  },
  {
    id: "av-1027",
    slug: "honda-hrv-2018",
    make: "Honda",
    model: "HR-V",
    year: 2018,
    price: 12_900_000,
    mileage: 59_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "1.8L",
    exteriorColour: "Red",
    availableColours: [
      { name: "Red", hex: "#a6302a" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2018 Honda HR-V in red with a 1.8-litre petrol engine, recorded at 59,000 km. A small crossover that gives the Honda selection an accessible SUV below the CR-V.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "Keyless entry",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "Red compact crossover SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1027",
  },
  {
    id: "av-1028",
    slug: "honda-city-2019",
    make: "Honda",
    model: "City",
    year: 2019,
    price: 10_200_000,
    mileage: 47_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2019 Honda City in white with a 1.5-litre petrol engine and automatic transmission, recorded at 47,000 km. An economical saloon at the lower end of the Honda range.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "Keyless entry",
      "15-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-civic-2018-1.jpg",
        alt: "White compact Honda saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1028",
  },
  {
    id: "av-1029",
    slug: "honda-odyssey-2015",
    make: "Honda",
    model: "Odyssey",
    year: 2015,
    price: 14_100_000,
    mileage: 121_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Minivan",
    condition: "Nigerian Used",
    engineCapacity: "3.5L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2015 Honda Odyssey in grey with a 3.5-litre V6 petrol engine and eight seats, recorded as Nigerian used with 121,000 km. A sliding-door family minivan at an accessible price.",
    features: [
      "Eight seats",
      "Sliding side doors",
      "Leather seats",
      "Reverse camera",
      "Tri-zone air conditioning",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-sienna-2019-1.jpg",
        alt: "Silver family minivan photographed in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1029",
  },
  {
    id: "av-1030",
    slug: "honda-accord-2020",
    make: "Honda",
    model: "Accord",
    year: 2020,
    price: 21_600_000,
    mileage: 38_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2020 Honda Accord in black with a turbocharged 1.5-litre petrol engine, recorded at 38,000 km. The newer generation saloon, shown alongside the 2017 Accord for a direct comparison.",
    features: [
      "Leather seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Dual-zone air conditioning",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-accord-2017-1.jpg",
        alt: "Black Honda Accord saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1030",
  },
  {
    id: "av-1031",
    slug: "honda-civic-2022",
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 24_300_000,
    mileage: 19_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2022 Honda Civic in silver with a turbocharged 1.5-litre petrol engine, recorded at 19,000 km. The newest and lowest-mileage Honda in the demonstration inventory.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Lane keeping assist",
      "Apple CarPlay and Android Auto",
      "Digital instrument cluster",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-civic-2018-1.jpg",
        alt: "Silver Honda Civic saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1031",
  },
  {
    id: "av-1032",
    slug: "honda-crv-2021",
    make: "Honda",
    model: "CR-V",
    year: 2021,
    price: 27_100_000,
    mileage: 26_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "1.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2021 Honda CR-V in black with a turbocharged 1.5-litre petrol engine, recorded at 26,000 km. The most recent CR-V in the dataset, and a direct comparison against the 2019 listing.",
    features: [
      "Leather seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Power tailgate",
      "Apple CarPlay and Android Auto",
      "Dual-zone air conditioning",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-crv-2019-1.jpg",
        alt: "Black Honda CR-V SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Sold",
    stockNumber: "AV-1032",
  },

  /* ────────────────────────── Mercedes-Benz (10) ────────────────────────── */
  {
    id: "av-1008",
    slug: "mercedes-benz-c300-2016",
    make: "Mercedes-Benz",
    model: "C300",
    year: 2016,
    price: 16_500_000,
    mileage: 88_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "2.0L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2016 Mercedes-Benz C300 in silver with a 2.0-litre turbocharged petrol engine, listed as Nigerian used with 88,000 km. Used on the site to show a European saloon in the comparison tool.",
    features: [
      "Leather seats",
      "Power front seats with memory",
      "Sunroof",
      "Reverse camera",
      "Dual-zone air conditioning",
      "Burmester audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-c300-2016-1.jpg",
        alt: "2016 Mercedes-Benz C300 saloon in silver, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1008",
  },
  {
    id: "av-1033",
    slug: "mercedes-benz-gle-2018",
    make: "Mercedes-Benz",
    model: "GLE 350",
    year: 2018,
    price: 39_900_000,
    mileage: 67_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "3.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2018 Mercedes-Benz GLE 350 in white with a 3.5-litre V6 petrol engine, recorded at 67,000 km. A large luxury SUV that anchors the top of the Mercedes-Benz selection.",
    features: [
      "Leather seats",
      "Powered front seats with memory",
      "Reverse camera",
      "Panoramic sunroof",
      "Power tailgate",
      "Burmester audio",
      "20-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-1.jpg",
        alt: "2018 Mercedes-Benz GLE 350 SUV in white, front three-quarter view",
      },
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-2.jpg",
        alt: "Rear three-quarter view of the white 2018 Mercedes-Benz GLE showing the tail lights",
        view: "back",
      },
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-3.jpg",
        alt: "Interior of the 2018 Mercedes-Benz GLE showing the widescreen dashboard display",
        view: "inside",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1033",
  },
  {
    id: "av-1034",
    slug: "mercedes-benz-e350-2015",
    make: "Mercedes-Benz",
    model: "E 350",
    year: 2015,
    price: 19_200_000,
    mileage: 106_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Nigerian Used",
    engineCapacity: "3.5L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2015 Mercedes-Benz E 350 in black with a 3.5-litre V6 petrol engine, recorded as Nigerian used with 106,000 km. An executive saloon that sits above the C-Class in size and price.",
    features: [
      "Leather seats",
      "Powered front seats with memory",
      "Reverse camera",
      "Sunroof",
      "Dual-zone air conditioning",
      "Harmon Kardon audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "Black executive saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1034",
  },
  {
    id: "av-1035",
    slug: "mercedes-benz-gla-250-2019",
    make: "Mercedes-Benz",
    model: "GLA 250",
    year: 2019,
    price: 28_400_000,
    mileage: 44_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2019 Mercedes-Benz GLA 250 in grey with a 2.0-litre turbocharged petrol engine, recorded at 44,000 km. A compact crossover for buyers who want the badge in a smaller package.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Panoramic sunroof",
      "Power tailgate",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-1.jpg",
        alt: "Grey compact Mercedes-Benz crossover in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1035",
  },
  {
    id: "av-1036",
    slug: "mercedes-benz-glc-300-2018",
    make: "Mercedes-Benz",
    model: "GLC 300",
    year: 2018,
    price: 33_700_000,
    mileage: 52_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Blue",
    availableColours: [
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2018 Mercedes-Benz GLC 300 in blue with a 2.0-litre turbocharged petrol engine, recorded at 52,000 km. A mid-size premium SUV that pairs with the GLE in the comparison view.",
    features: [
      "Leather seats",
      "Powered front seats with memory",
      "Reverse camera",
      "Sunroof",
      "Power tailgate",
      "Burmester audio",
      "19-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-1.jpg",
        alt: "Blue Mercedes-Benz mid-size SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1036",
  },
  {
    id: "av-1037",
    slug: "mercedes-benz-c300-2020",
    make: "Mercedes-Benz",
    model: "C300",
    year: 2020,
    price: 31_800_000,
    mileage: 36_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2020 Mercedes-Benz C300 in white with a 2.0-litre turbocharged petrol engine, recorded at 36,000 km. The facelifted C-Class, shown against the 2016 listing to compare model years.",
    features: [
      "Leather seats",
      "Powered front seats with memory",
      "Panoramic sunroof",
      "Reverse camera",
      "Wireless charging",
      "Burmester audio",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-c300-2016-1.jpg",
        alt: "White Mercedes-Benz C-Class saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1037",
  },
  {
    id: "av-1038",
    slug: "mercedes-benz-ml-350-2014",
    make: "Mercedes-Benz",
    model: "ML 350",
    year: 2014,
    price: 17_800_000,
    mileage: 139_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Nigerian Used",
    engineCapacity: "3.5L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2014 Mercedes-Benz ML 350 in silver with a 3.5-litre V6 petrol engine, recorded as Nigerian used with 139,000 km. The oldest Mercedes-Benz in the selection and the predecessor to the GLE.",
    features: [
      "Leather seats",
      "Powered front seats",
      "Reverse camera",
      "Sunroof",
      "Power tailgate",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/mercedes-benz-gle-2018-1.jpg",
        alt: "Silver Mercedes-Benz SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1038",
  },
  {
    id: "av-1039",
    slug: "mercedes-benz-a250-2019",
    make: "Mercedes-Benz",
    model: "A 250",
    year: 2019,
    price: 22_900_000,
    mileage: 48_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Hatchback",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Red",
    availableColours: [
      { name: "Red", hex: "#a6302a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Blue", hex: "#2b4a72" },
    ],
    description:
      "A 2019 Mercedes-Benz A 250 hatchback in red with a 2.0-litre turbocharged petrol engine, recorded at 48,000 km. The smallest and least expensive Mercedes-Benz here.",
    features: [
      "Leather seats",
      "Reverse camera",
      "Dual-zone air conditioning",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "Red compact hatchback in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1039",
  },
  {
    id: "av-1040",
    slug: "mercedes-benz-vito-2017",
    make: "Mercedes-Benz",
    model: "Vito Tourer",
    year: 2017,
    price: 20_600_000,
    mileage: 97_000,
    transmission: "Automatic",
    fuelType: "Diesel",
    bodyStyle: "Minivan",
    condition: "Foreign Used",
    engineCapacity: "2.1L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2017 Mercedes-Benz Vito Tourer in white with a 2.1-litre diesel engine and eight seats, recorded at 97,000 km. A passenger van for family or business use, and the only diesel Mercedes-Benz listed.",
    features: [
      "Eight seats",
      "Sliding side doors",
      "Air conditioning",
      "Reverse camera",
      "Bluetooth audio",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-sienna-2019-1.jpg",
        alt: "Silver passenger van photographed in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1040",
  },
  {
    id: "av-1041",
    slug: "mercedes-benz-s550-2015",
    make: "Mercedes-Benz",
    model: "S 550",
    year: 2015,
    price: 44_500_000,
    mileage: 91_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "4.7L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2015 Mercedes-Benz S 550 in black with a 4.7-litre V8 petrol engine, recorded at 91,000 km. The flagship saloon of the brand and the second most expensive car in the dataset.",
    features: [
      "Nappa leather seats",
      "Rear seat entertainment",
      "Massaging front seats",
      "Panoramic sunroof",
      "Burmester surround audio",
      "Power closing doors",
      "19-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/lexus-es-350-2020-1.jpg",
        alt: "Black Mercedes-Benz flagship saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Reserved",
    stockNumber: "AV-1041",
  },

  /* ───────────────────────────── Hyundai (10) ───────────────────────────── */
  {
    id: "av-1009",
    slug: "hyundai-tucson-2018",
    make: "Hyundai",
    model: "Tucson",
    year: 2018,
    price: 13_200_000,
    mileage: 71_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Nigerian Used",
    engineCapacity: "2.0L",
    exteriorColour: "Red",
    availableColours: [
      { name: "Red", hex: "#a6302a" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2018 Hyundai Tucson in red with a 2.0-litre petrol engine, automatic transmission and 71,000 km on the listing. Shows an entry-level SUV with a strong colour for the card design.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "Keyless entry",
      "17-inch alloy wheels",
      "Rear parking sensors",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "2018 Hyundai Tucson SUV in red, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1009",
  },
  {
    id: "av-1042",
    slug: "hyundai-elantra-2020",
    make: "Hyundai",
    model: "Elantra",
    year: 2020,
    price: 15_700_000,
    mileage: 43_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "2.0L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2020 Hyundai Elantra in silver with a 2.0-litre petrol engine and automatic transmission, recorded at 43,000 km. A compact saloon that gives Hyundai a sedan in the mid-price band.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Apple CarPlay and Android Auto",
      "Keyless entry",
      "16-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-civic-2018-1.jpg",
        alt: "Silver Hyundai compact saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: true,
    availability: "Available",
    stockNumber: "AV-1042",
  },
  {
    id: "av-1043",
    slug: "hyundai-santa-fe-2017",
    make: "Hyundai",
    model: "Santa Fe",
    year: 2017,
    price: 19_400_000,
    mileage: 86_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "2.4L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2017 Hyundai Santa Fe in white with a 2.4-litre petrol engine and seven seats, recorded at 86,000 km. The largest SUV in the Hyundai selection and a Hyundai alternative to the Highlander.",
    features: [
      "Seven seats",
      "Leather seats",
      "Reverse camera",
      "Dual-zone air conditioning",
      "Power tailgate",
      "18-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-highlander-2015-1.jpg",
        alt: "White seven-seat Hyundai SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1043",
  },
  {
    id: "av-1044",
    slug: "hyundai-accent-2019",
    make: "Hyundai",
    model: "Accent",
    year: 2019,
    price: 9_400_000,
    mileage: 52_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "1.6L",
    exteriorColour: "Grey",
    availableColours: [
      { name: "Grey", hex: "#8b9095" },
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2019 Hyundai Accent in grey with a 1.6-litre petrol engine, recorded at 52,000 km. One of the most affordable saloons in the dataset, useful for showing a first-car budget.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "15-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-accord-2017-1.jpg",
        alt: "Grey compact Hyundai saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1044",
  },
  {
    id: "av-1045",
    slug: "hyundai-sonata-2018",
    make: "Hyundai",
    model: "Sonata",
    year: 2018,
    price: 17_200_000,
    mileage: 63_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "Sedan",
    condition: "Foreign Used",
    engineCapacity: "2.4L",
    exteriorColour: "Black",
    availableColours: [
      { name: "Black", hex: "#15171a" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2018 Hyundai Sonata in black with a 2.4-litre petrol engine, recorded at 63,000 km. A mid-size saloon that competes directly with the Camry and Accord listings.",
    features: [
      "Leather seats",
      "Reverse camera",
      "Dual-zone air conditioning",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-accord-2017-1.jpg",
        alt: "Black Hyundai Sonata saloon in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1045",
  },
  {
    id: "av-1046",
    slug: "hyundai-kona-2021",
    make: "Hyundai",
    model: "Kona",
    year: 2021,
    price: 18_600_000,
    mileage: 31_000,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Foreign Used",
    engineCapacity: "1.6L",
    exteriorColour: "Blue",
    availableColours: [
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2021 Hyundai Kona in blue with a turbocharged 1.6-litre petrol engine, recorded at 31,000 km. A compact crossover and the newest Hyundai in the demonstration set.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Adaptive cruise control",
      "Apple CarPlay and Android Auto",
      "Keyless entry and push-button start",
      "17-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "Blue Hyundai compact crossover in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1046",
  },
  {
    id: "av-1047",
    slug: "hyundai-creta-2019",
    make: "Hyundai",
    model: "Creta",
    year: 2019,
    price: 12_300_000,
    mileage: 41_000,
    transmission: "Manual",
    fuelType: "Petrol",
    bodyStyle: "SUV",
    condition: "Nigerian Used",
    engineCapacity: "1.6L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Black", hex: "#15171a" },
      { name: "Silver", hex: "#c9cdcf" },
    ],
    description:
      "A 2019 Hyundai Creta in white with a 1.6-litre petrol engine and manual gearbox, recorded at 41,000 km. Included so the manual-transmission filter has a second SUV option.",
    features: [
      "Fabric seats",
      "Reverse camera",
      "Air conditioning",
      "Bluetooth audio",
      "16-inch alloy wheels",
      "Rear parking sensors",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "White Hyundai Creta compact SUV in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1047",
  },
  {
    id: "av-1048",
    slug: "hyundai-ioniq-2020",
    make: "Hyundai",
    model: "Ioniq",
    year: 2020,
    price: 16_800_000,
    mileage: 37_000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    bodyStyle: "Hatchback",
    condition: "Foreign Used",
    engineCapacity: "1.6L",
    exteriorColour: "Silver",
    availableColours: [
      { name: "Silver", hex: "#c9cdcf" },
      { name: "White", hex: "#f2f2ef" },
      { name: "Blue", hex: "#2b4a72" },
      { name: "Black", hex: "#15171a" },
    ],
    description:
      "A 2020 Hyundai Ioniq hybrid in silver with a 1.6-litre petrol-electric powertrain, recorded at 37,000 km. A fuel-focused hatchback that gives the hybrid fuel filter a second listing.",
    features: [
      "Hybrid powertrain",
      "Fabric seats",
      "Reverse camera",
      "Regenerative braking",
      "Apple CarPlay and Android Auto",
      "16-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/honda-civic-2018-1.jpg",
        alt: "Silver hybrid hatchback in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1048",
  },
  {
    id: "av-1049",
    slug: "hyundai-i30-2017",
    make: "Hyundai",
    model: "i30",
    year: 2017,
    price: 9_900_000,
    mileage: 79_000,
    transmission: "Manual",
    fuelType: "Petrol",
    bodyStyle: "Hatchback",
    condition: "Nigerian Used",
    engineCapacity: "1.4L",
    exteriorColour: "Red",
    availableColours: [
      { name: "Red", hex: "#a6302a" },
      { name: "White", hex: "#f2f2ef" },
    ],
    description:
      "A 2017 Hyundai i30 hatchback in red with a 1.4-litre petrol engine and manual transmission, recorded at 79,000 km. An economical city car at the low end of the price range.",
    features: [
      "Fabric seats",
      "Air conditioning",
      "Bluetooth audio",
      "Rear parking sensors",
      "16-inch alloy wheels",
    ],
    images: [
      {
        src: "/images/vehicles/hyundai-tucson-2018-1.jpg",
        alt: "Red Hyundai hatchback in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1049",
  },
  {
    id: "av-1050",
    slug: "hyundai-grand-starex-2018",
    make: "Hyundai",
    model: "Grand Starex",
    year: 2018,
    price: 21_700_000,
    mileage: 68_000,
    transmission: "Automatic",
    fuelType: "Diesel",
    bodyStyle: "Minivan",
    condition: "Nigerian Used",
    engineCapacity: "2.5L",
    exteriorColour: "White",
    availableColours: [
      { name: "White", hex: "#f2f2ef" },
      { name: "Silver", hex: "#c9cdcf" },
      { name: "Grey", hex: "#8b9095" },
    ],
    description:
      "A 2018 Hyundai Grand Starex in white with a 2.5-litre diesel engine and eleven seats, recorded at 68,000 km. A passenger van for commercial or large-family use, and the only eleven-seater listed.",
    features: [
      "Eleven seats",
      "Sliding side doors",
      "Air conditioning",
      "Bluetooth audio",
      "Reverse camera",
      "16-inch steel wheels",
    ],
    images: [
      {
        src: "/images/vehicles/toyota-sienna-2019-1.jpg",
        alt: "Silver passenger van photographed in a dark studio, front three-quarter view",
      },
    ],
    featured: false,
    availability: "Available",
    stockNumber: "AV-1050",
  },
];

/**
 * Reference photography for the four gallery angles, keyed by body style.
 *
 * A listing keeps every angle it has its own photograph for (tagged with
 * `view`), and the remaining angles are filled from the matching body-style
 * set. That guarantees the same four views everywhere — front, back, inside and
 * boot — without ever repeating an angle. Reference images say "representative"
 * in their alt text so shared views are never passed off as this exact unit.
 */
const VIEW_ORDER: GalleryView[] = ["front", "back", "inside", "boot"];

const VIEW_LABELS: Record<GalleryView, string> = {
  front: "front three-quarter view",
  back: "rear three-quarter view",
  inside: "interior view of the dashboard and front seats",
  boot: "open boot showing the luggage compartment",
};

type ReferenceView = Exclude<GalleryView, "front">;

const BODY_STYLE_REFERENCE: Record<string, Record<ReferenceView, string>> = {
  Sedan: {
    back: "/images/vehicles/gallery/sedan-rear.jpg",
    inside: "/images/vehicles/gallery/sedan-interior.jpg",
    boot: "/images/vehicles/gallery/sedan-boot.jpg",
  },
  SUV: {
    back: "/images/vehicles/gallery/suv-rear.jpg",
    inside: "/images/vehicles/gallery/suv-interior.jpg",
    boot: "/images/vehicles/gallery/suv-boot.jpg",
  },
  Hatchback: {
    back: "/images/vehicles/gallery/hatchback-rear.jpg",
    inside: "/images/vehicles/gallery/hatchback-interior.jpg",
    boot: "/images/vehicles/gallery/hatchback-boot.jpg",
  },
  Pickup: {
    back: "/images/vehicles/gallery/pickup-rear.jpg",
    inside: "/images/vehicles/gallery/pickup-interior.jpg",
    boot: "/images/vehicles/gallery/pickup-boot.jpg",
  },
  Minivan: {
    back: "/images/vehicles/toyota-sienna-2019-2.jpg",
    inside: "/images/vehicles/gallery/minivan-interior.jpg",
    boot: "/images/vehicles/gallery/minivan-boot.jpg",
  },
};

/** The four gallery views every listing presents, in order. */
export const GALLERY_VIEWS = VIEW_ORDER;

/**
 * Body-style names as they should read in a sentence, with the right article.
 * "a suv" would be read aloud verbatim by a screen reader, so the article and
 * capitalisation are part of the data rather than string concatenation.
 */
const BODY_STYLE_PROSE: Record<Vehicle["bodyStyle"], string> = {
  Sedan: "a sedan",
  SUV: "an SUV",
  Hatchback: "a hatchback",
  Pickup: "a pickup",
  Minivan: "a minivan",
};

/**
 * Builds a four-image gallery: one photograph per view, in the order
 * front → back → inside → boot. A listing's own photography always wins over
 * the reference set, and a source is never used twice in the same gallery.
 */
function withGallery(vehicle: Vehicle): Vehicle {
  const reference = BODY_STYLE_REFERENCE[vehicle.bodyStyle];
  const used = new Set<string>();
  const images: VehicleImage[] = [];

  for (const view of VIEW_ORDER) {
    const own = vehicle.images.find(
      (image) => (image.view ?? "front") === view && !used.has(image.src),
    );

    if (own) {
      used.add(own.src);
      images.push({ ...own, view });
      continue;
    }

    if (view === "front" || !reference) continue;
    const src = reference[view];
    if (used.has(src)) continue;
    used.add(src);
    images.push({
      src,
      alt: `Representative ${VIEW_LABELS[view]} of ${BODY_STYLE_PROSE[vehicle.bodyStyle] ?? `a ${vehicle.bodyStyle.toLowerCase()}`} similar to this ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      view,
    });
  }

  return { ...vehicle, images };
}

/** The hand-written listings, before gallery composition. */
export const BASE_VEHICLES: Vehicle[] = baseVehicles;

/** Number of photographs in every composed gallery. */
export const GALLERY_IMAGE_COUNT = VIEW_ORDER.length;

/** Every vehicle, in dataset order (grouped by make), with its four-view gallery. */
export const vehicles: Vehicle[] = baseVehicles.map(withGallery);

export const ALL_VEHICLES = vehicles;

export const VEHICLE_COUNT = ALL_VEHICLES.length;

/** Featured vehicles for the homepage: one per brand first, then filled to four. */
export const FEATURED_VEHICLES: Vehicle[] = (() => {
  const featured = ALL_VEHICLES.filter((vehicle) => vehicle.featured);
  const onePerMake: Vehicle[] = [];
  for (const vehicle of featured) {
    if (!onePerMake.some((entry) => entry.make === vehicle.make)) onePerMake.push(vehicle);
  }
  const rest = featured.filter((vehicle) => !onePerMake.includes(vehicle));
  return [...onePerMake, ...rest].slice(0, 4);
})();

/** Sorted, de-duplicated makes for filter controls. */
export const VEHICLE_MAKES: string[] = [...new Set(ALL_VEHICLES.map((v) => v.make))].sort((a, b) =>
  a.localeCompare(b),
);

/** Sorted, de-duplicated body styles for filter controls. */
export const VEHICLE_BODY_STYLES: string[] = [...new Set(ALL_VEHICLES.map((v) => v.bodyStyle))].sort(
  (a, b) => a.localeCompare(b),
);

/** Sorted, de-duplicated fuel types for filter controls. */
export const VEHICLE_FUEL_TYPES: string[] = [...new Set(ALL_VEHICLES.map((v) => v.fuelType))].sort(
  (a, b) => a.localeCompare(b),
);

/** Model years present in the dataset, newest first. */
export const VEHICLE_YEARS: number[] = [...new Set(ALL_VEHICLES.map((v) => v.year))].sort(
  (a, b) => b - a,
);

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return ALL_VEHICLES.find((vehicle) => vehicle.slug === slug);
}

export function getVehiclesBySlugs(slugs: string[]): Vehicle[] {
  return slugs
    .map((slug) => getVehicleBySlug(slug))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle));
}

export function getVehicleSlugs(): string[] {
  return ALL_VEHICLES.map((vehicle) => vehicle.slug);
}

/** Count of listings per make, used by the brand index on the inventory page. */
export const VEHICLE_COUNT_BY_MAKE: { make: string; count: number }[] = VEHICLE_MAKES.map((make) => ({
  make,
  count: ALL_VEHICLES.filter((vehicle) => vehicle.make === make).length,
}));

/**
 * Up to `limit` other vehicles sharing a make or body style, used as
 * "similar vehicles" links on detail pages.
 */
export function getSimilarVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  return ALL_VEHICLES.filter((candidate) => candidate.slug !== vehicle.slug)
    .map((candidate) => {
      const score =
        (candidate.make === vehicle.make ? 2 : 0) + (candidate.bodyStyle === vehicle.bodyStyle ? 1 : 0);
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.year - a.candidate.year)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
