export interface Disease {
  slug: string;
  name: string;
  plant: string;
  image: string;
  overview: string;
  cause: string;
  earlySymptoms: string[];
  advancedSymptoms: string[];
  treatment: string[];
  prevention: string[];
  severity: "Low" | "Medium" | "High";
  recovery: string;
  relatedDiseases: string[];
}

export const diseases: Disease[] = [
  {
    slug: "tomato-early-blight",
    name: "Tomato Early Blight",
    plant: "Tomato",
    image: "/diseases/tomato-early-blight.jpg",

    overview:
      "This disease usually starts on the older leaves of a tomato plant. Small brown spots appear first and slowly become larger. If it spreads, the leaves may turn yellow, dry out, and fall.",

    cause:
      "It spreads more easily in warm and damp conditions. Wet leaves, poor air movement, and infected plant material can make the problem worse.",

    earlySymptoms: [
      "Small brown spots appear on the older leaves",
      "Yellow areas may appear around the brown spots",
      "Lower leaves start turning yellow",
      "The spots slowly become larger"
    ],

    advancedSymptoms: [
      "Brown spots cover larger parts of the leaves",
      "Leaves become dry and fall off",
      "Dark spots may appear on the stems",
      "Fruits may develop dark, sunken spots"
    ],

    treatment: [
      "Remove badly affected leaves and throw them away from the plant",
      "Avoid getting water directly on the leaves",
      "Keep enough space between plants for air to move freely",
      "Use a suitable disease-control spray if the problem continues"
    ],

    prevention: [
      "Give tomato plants enough space",
      "Water near the base of the plant",
      "Remove fallen and infected leaves",
      "Avoid keeping the leaves wet for long periods"
    ],

    severity: "Medium",

    recovery:
      "The plant has a good chance of recovering when the disease is noticed early and affected leaves are removed.",

    relatedDiseases: [
      "Tomato Late Blight",
      "Tomato Septoria Leaf Spot"
    ]
  },

  {
    slug: "tomato-late-blight",
    name: "Tomato Late Blight",
    plant: "Tomato",
    image: "/diseases/tomato-late-blight.jpg",

    overview:
      "This is a fast-spreading tomato disease. It can cause large dark patches on leaves and may quickly affect stems and fruits, especially during cool and wet weather.",

    cause:
      "The disease spreads quickly when the weather is cool, wet, and humid. Leaves that stay wet for a long time increase the risk of infection.",

    earlySymptoms: [
      "Pale green or water-like patches appear on leaves",
      "Leaves may develop small dark areas",
      "The affected areas slowly become larger",
      "The leaves may look wet or damaged"
    ],

    advancedSymptoms: [
      "Large dark brown or black patches cover the leaves",
      "Leaves quickly turn brown and collapse",
      "Dark damaged areas may appear on the stems",
      "Tomatoes may develop dark, rotten areas"
    ],

    treatment: [
      "Remove badly infected leaves or plants quickly",
      "Keep infected plant material away from healthy plants",
      "Avoid watering the leaves directly",
      "Use a suitable disease-control spray as recommended"
    ],

    prevention: [
      "Check tomato plants regularly",
      "Avoid keeping leaves wet for long periods",
      "Give plants enough space for good air movement",
      "Remove infected plant material quickly"
    ],

    severity: "High",

    recovery:
      "Recovery can be difficult when the disease has spread widely. Finding and controlling it early gives the plant a much better chance.",

    relatedDiseases: [
      "Tomato Early Blight",
      "Potato Late Blight"
    ]
  },

  {
    slug: "apple-scab",
    name: "Apple Scab",
    plant: "Apple",
    image: "/diseases/apple-scab.jpg",

    overview:
      "Apple Scab causes spots on apple leaves and fruits. The problem is more common during cool and wet weather and can reduce the quality of the apples.",

    cause:
      "The disease spreads more easily when the weather is cool and rainy. Wet leaves and fallen infected leaves can help the problem spread.",

    earlySymptoms: [
      "Small green or brown spots appear on the leaves",
      "Spots slowly become darker",
      "Young leaves may become slightly curled",
      "Small marks may appear on young fruits"
    ],

    advancedSymptoms: [
      "Dark rough spots appear on apples",
      "The skin of the fruit may crack around damaged areas",
      "Affected leaves may turn yellow and fall",
      "Fruits may become smaller or less attractive"
    ],

    treatment: [
      "Remove badly affected leaves and fruits",
      "Clean up fallen leaves around the tree",
      "Prune crowded branches to improve air movement",
      "Use a suitable disease-control spray when needed"
    ],

    prevention: [
      "Keep the area around the tree clean",
      "Remove fallen leaves regularly",
      "Allow good air movement through the branches",
      "Check leaves and fruits regularly for new spots"
    ],

    severity: "Medium",

    recovery:
      "Apple trees usually have a good chance of staying healthy when the problem is noticed early and managed properly.",

    relatedDiseases: [
      "Apple Cedar Rust"
    ]
  },

  {
    slug: "corn-rust",
    name: "Corn Rust",
    plant: "Corn",
    image: "/diseases/corn-rust.jpg",

    overview:
      "Corn Rust appears as small orange or reddish-brown spots on corn leaves. As the disease spreads, more of the leaf surface can become covered with these spots.",

    cause:
      "It spreads more easily in warm, humid, and wet conditions. The disease can move from infected plants to healthy plants.",

    earlySymptoms: [
      "Small orange or reddish-brown spots appear on leaves",
      "The spots may look slightly raised",
      "Small yellow areas may appear around the spots",
      "A few spots may appear at first and slowly increase"
    ],

    advancedSymptoms: [
      "Large parts of the leaves become covered with rust-colored spots",
      "Leaves may start drying from the affected areas",
      "The plant may become weaker",
      "Grain production can be reduced"
    ],

    treatment: [
      "Remove badly affected plant material where practical",
      "Check nearby plants for similar symptoms",
      "Use a suitable disease-control spray when necessary",
      "Keep the field clean of infected plant remains"
    ],

    prevention: [
      "Check corn plants regularly",
      "Remove infected plant remains after harvest",
      "Avoid unnecessary overwatering",
      "Use varieties that are less likely to develop the disease when available"
    ],

    severity: "Medium",

    recovery:
      "Plants have a better chance of staying productive when the disease is noticed before large parts of the leaves are affected.",

    relatedDiseases: [
      "Corn Gray Leaf Spot"
    ]
  },

  {
    slug: "grape-black-rot",
    name: "Grape Black Rot",
    plant: "Grape",
    image: "/diseases/grape-black-rot.jpg",

    overview:
      "Grape Black Rot can affect grape leaves and fruits. It often starts with small brown spots and can eventually cause grapes to turn dark, dry, and shrivel.",

    cause:
      "The disease spreads more easily during warm and humid weather. Wet leaves and infected grapes or plant remains can help it spread.",

    earlySymptoms: [
      "Small brown spots appear on the leaves",
      "The spots may have darker edges",
      "Small dark marks may appear on young grapes",
      "Affected areas slowly become larger"
    ],

    advancedSymptoms: [
      "Grapes become dark and shrivel up",
      "Affected grapes may dry and remain attached to the vine",
      "Leaves develop more brown spots and begin drying",
      "Large parts of the plant may become affected"
    ],

    treatment: [
      "Remove affected grapes and leaves",
      "Cut away badly affected parts of the vine",
      "Keep infected plant material away from healthy vines",
      "Use a suitable disease-control spray when necessary"
    ],

    prevention: [
      "Remove dried and infected grapes from the vine",
      "Clean up fallen leaves and plant remains",
      "Give vines enough space for air movement",
      "Check grapes and leaves regularly"
    ],

    severity: "High",

    recovery:
      "The vine has a good chance of staying healthy when the disease is found before many grapes become affected.",

    relatedDiseases: [
      "Grape Esca"
    ]
  },

  {
    slug: "tomato-septoria-leaf-spot",
    name: "Tomato Septoria Leaf Spot",
    plant: "Tomato",
    image: "/diseases/tomato-septoria.jpg",

    overview:
      "This disease mainly affects tomato leaves. It usually starts with many small spots on the lower leaves and can slowly move upward through the plant.",

    cause:
      "The problem spreads more easily in warm, wet, and humid conditions. Water splashing from infected leaves or soil can also help spread it.",

    earlySymptoms: [
      "Small round spots appear on the lower leaves",
      "The spots may have dark edges",
      "The centers of the spots may look gray or light brown",
      "Lower leaves may start turning yellow"
    ],

    advancedSymptoms: [
      "Many spots cover the leaves",
      "Leaves become yellow, dry, and fall off",
      "The disease can move to higher leaves",
      "The plant may produce fewer healthy fruits"
    ],

    treatment: [
      "Remove badly affected leaves",
      "Keep infected leaves away from healthy plants",
      "Avoid splashing water onto the leaves",
      "Use a suitable disease-control spray if needed"
    ],

    prevention: [
      "Give plants enough space for air movement",
      "Water near the base of the plant",
      "Remove fallen leaves and plant remains",
      "Check the lower leaves regularly"
    ],

    severity: "Medium",

    recovery:
      "Tomato plants usually have a good chance of continuing to grow when the disease is noticed early and affected leaves are removed.",

    relatedDiseases: [
      "Tomato Early Blight"
    ]
  },

  {
    slug: "potato-early-blight",
    name: "Potato Early Blight",
    plant: "Potato",
    image: "/diseases/potato-early-blight.jpg",

    overview:
      "Potato Early Blight usually starts on the older leaves. Brown spots slowly grow and can cause leaves to dry, reducing the plant's ability to produce healthy potatoes.",

    cause:
      "It spreads more easily in warm conditions when plants are stressed or leaves stay wet. Infected plant remains can also help the disease return.",

    earlySymptoms: [
      "Small dark spots appear on older leaves",
      "Yellow areas may appear around the spots",
      "Lower leaves are usually affected first",
      "The spots slowly become larger"
    ],

    advancedSymptoms: [
      "Large brown areas appear on the leaves",
      "Leaves become dry and fall",
      "Stems may develop dark damaged areas",
      "Potatoes may be smaller than expected"
    ],

    treatment: [
      "Remove badly affected leaves",
      "Keep infected plant material away from healthy plants",
      "Avoid getting water directly on the leaves",
      "Use a suitable disease-control spray when necessary"
    ],

    prevention: [
      "Use healthy seed potatoes",
      "Rotate crops when possible",
      "Give plants enough space",
      "Remove infected plant remains after harvest"
    ],

    severity: "Medium",

    recovery:
      "The plant has a good chance of continuing to grow when the disease is found early and the spread is controlled.",

    relatedDiseases: [
      "Potato Late Blight"
    ]
  },

  {
    slug: "potato-late-blight",
    name: "Potato Late Blight",
    plant: "Potato",
    image: "/diseases/potato-late-blight.jpg",

    overview:
      "Potato Late Blight spreads quickly, especially during cool and wet weather. It can damage leaves, stems, and potatoes if it is not controlled quickly.",

    cause:
      "The disease spreads rapidly when the weather is cool, rainy, and humid. Wet leaves and infected plant material can help it move through the crop.",

    earlySymptoms: [
      "Water-like dark patches appear on leaves",
      "Small dark spots may appear first",
      "White growth may sometimes be seen on the underside of affected leaves",
      "The damaged areas slowly become larger"
    ],

    advancedSymptoms: [
      "Large dark areas cover the leaves",
      "Leaves quickly turn brown and collapse",
      "Stems may develop dark damaged areas",
      "Potatoes may develop dark or rotten patches"
    ],

    treatment: [
      "Remove badly infected plants quickly",
      "Keep infected plant material away from healthy plants",
      "Avoid watering the leaves directly",
      "Use a suitable disease-control spray as recommended"
    ],

    prevention: [
      "Check plants frequently during wet weather",
      "Use healthy seed potatoes",
      "Avoid keeping leaves wet for long periods",
      "Remove infected plant remains"
    ],

    severity: "High",

    recovery:
      "Recovery is difficult when the disease has spread widely. Quick action at the first signs gives the crop a better chance.",

    relatedDiseases: [
      "Potato Early Blight",
      "Tomato Late Blight"
    ]
  },

  {
    slug: "apple-cedar-rust",
    name: "Apple Cedar Rust",
    plant: "Apple",
    image: "/diseases/apple-cedar-rust.jpg",

    overview:
      "Apple Cedar Rust causes bright orange or yellow spots on apple leaves. In some cases, the fruit can also become damaged or misshapen.",

    cause:
      "The disease spreads more easily when the weather is wet. It can also spread between apple trees and certain nearby plants.",

    earlySymptoms: [
      "Small yellow or orange spots appear on leaves",
      "The spots become brighter as they grow",
      "A few spots may appear at first",
      "Young leaves may show signs of damage"
    ],

    advancedSymptoms: [
      "Many orange spots cover the leaves",
      "Affected leaves may fall early",
      "Fruit may become misshapen",
      "The tree may produce less healthy fruit"
    ],

    treatment: [
      "Remove badly affected leaves where practical",
      "Remove badly affected fruit",
      "Prune crowded branches to improve air movement",
      "Use a suitable disease-control spray when necessary"
    ],

    prevention: [
      "Check leaves regularly during wet weather",
      "Keep the area around the tree clean",
      "Allow good air movement through the branches",
      "Choose less disease-prone varieties when available"
    ],

    severity: "Medium",

    recovery:
      "Apple trees usually continue to grow well when the disease is noticed early and managed properly.",

    relatedDiseases: [
      "Apple Scab"
    ]
  },

  {
    slug: "corn-gray-leaf-spot",
    name: "Corn Gray Leaf Spot",
    plant: "Corn",
    image: "/diseases/corn-gray-leaf-spot.jpg",

    overview:
      "This disease causes long gray or brown marks on corn leaves. As more leaves become affected, the plant may have difficulty growing and producing a good crop.",

    cause:
      "It spreads more easily in warm, humid conditions, especially when leaves stay wet for long periods.",

    earlySymptoms: [
      "Small gray or light brown marks appear on leaves",
      "The marks may look like short lines or rectangles",
      "More spots slowly appear on nearby leaves",
      "Affected areas become easier to see as they grow"
    ],

    advancedSymptoms: [
      "Long gray or brown marks cover large parts of the leaves",
      "Leaves begin drying from the affected areas",
      "Large sections of the plant may lose healthy green color",
      "Grain production may decrease"
    ],

    treatment: [
      "Remove infected plant remains when possible",
      "Check nearby plants for similar symptoms",
      "Use a suitable disease-control spray when necessary",
      "Avoid keeping the leaves wet for long periods"
    ],

    prevention: [
      "Rotate crops when possible",
      "Remove infected plant remains after harvest",
      "Check plants regularly",
      "Use varieties that are less likely to develop the disease when available"
    ],

    severity: "Medium",

    recovery:
      "The crop has a better chance of staying productive when the disease is noticed before large parts of the leaves are affected.",

    relatedDiseases: [
      "Corn Rust"
    ]
  },

  {
    slug: "grape-esca",
    name: "Grape Esca",
    plant: "Grape",
    image: "/diseases/grape-esca.jpg",

    overview:
      "Grape Esca is a long-lasting problem that can slowly weaken grapevines. The leaves may develop yellow and brown areas, and the vine may produce poorer-quality grapes.",

    cause:
      "The problem can enter damaged parts of the vine, especially through cuts or wounds. It can slowly affect the inside of older vines.",

    earlySymptoms: [
      "Yellow areas appear between the leaf veins",
      "Brown patches begin to appear on leaves",
      "Some leaves may look scorched around the edges",
      "Fruit growth may become weaker"
    ],

    advancedSymptoms: [
      "Large parts of the leaves become brown and dry",
      "Leaves may fall earlier than normal",
      "Grapes may be smaller or lower in quality",
      "The vine may become weak and slowly decline"
    ],

    treatment: [
      "Remove badly damaged parts of the vine when possible",
      "Cut away unhealthy wood using clean tools",
      "Keep the vine healthy with proper care",
      "Monitor the vine regularly for worsening symptoms"
    ],

    prevention: [
      "Use clean tools when pruning",
      "Avoid unnecessary damage to the vine",
      "Protect pruning cuts from unnecessary exposure",
      "Remove badly damaged plant parts"
    ],

    severity: "High",

    recovery:
      "Recovery can be difficult when the inside of the vine is badly damaged. Early signs should be monitored carefully.",

    relatedDiseases: [
      "Grape Black Rot"
    ]
  }
];