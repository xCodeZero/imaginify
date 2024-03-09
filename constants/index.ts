export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Buy Credits",
    route: "/payments",
    icon: "/assets/icons/bag.svg",
  },
  {
    label: "My payments",
    route: "/paymentdetails",
    icon: "/assets/icons/atm-card.png",
  },
];

export const paymentLinks = [
  {
    label: "Buy Credits Using Credit Cards",
    route: "/credits",
    icon: "/assets/icons/atm-card.png",
  },
  {
    label: "Buy Credits Using Paypal",
    route: "/paypal",
    icon: "/assets/icons/paypal.png",
  },
  {
    label: "Buy Credits Using GCash",
    route: "/gcashpayment/pay/gcash",
    icon: "/assets/icons/gcash.png",
  },
  {
    label: "Buy Credits Using Bank Transfer",
    route: "/bankpayment/pay/bank",
    icon: "/assets/icons/banking.png",
  },
];

export const adminNavLinks = [
  {
    label: "Administrator",
    route: "/admin",
    icon: "/assets/icons/admin.png",
  },
  {
    label: "GCash Payments",
    route: "/gcash",
    icon: "/assets/icons/gcash.png",
  },
  {
    label: "Bank Transfer",
    route: "/bank",
    icon: "/assets/icons/banking.png",
  },
  {
    label: "All Transactions",
    route: "/transactions",
    icon: "/assets/icons/report.png",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const privacyOptions = {
  Private: {
    privacy: 2,
    label: "Private Image",
  },
  Public: {
    privacy: 1,
    label: "Public Image",
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
  privacy: 1,
};

export const paymentTypes = {
  gcash: {
    type: "gcash",
    title: "Gcash Payment",
    subTitle: "Add credits using your GCash",
    icon: "gcash.png",
  },
  bank: {
    type: "bank",
    title: "Bank Transfer",
    subTitle: "Add credits using Bank Transfer",
    icon: "banking.png",
  },
};

export const creditFee = -1;
