/**
 * Host prep content: what to do before and during party day,
 * syrup recipes, and the checklist the host ticks off.
 */

export interface PrepGroup {
  id: string;
  title: string;
  when: string;
  items: { id: string; label: string; detail?: string }[];
}

export const PREP_GROUPS: PrepGroup[] = [
  {
    id: "before-buy",
    title: "Make or buy syrups",
    when: "Before party day",
    items: [
      { id: "simple-syrup", label: "Simple syrup", detail: "See syrup recipes below. Keeps 2 weeks refrigerated." },
      { id: "honey-syrup", label: "Honey syrup", detail: "Keeps 2 weeks refrigerated." },
      { id: "blueberry-syrup", label: "Blueberry syrup", detail: "Keeps about 1 week refrigerated." },
    ],
  },
  {
    id: "before-chill",
    title: "Chill",
    when: "Before party day",
    items: [
      { id: "chill-prosecco", label: "Prosecco" },
      { id: "chill-ginger-beer", label: "Ginger beer" },
      { id: "chill-grapefruit-soda", label: "Grapefruit soda" },
      { id: "chill-club-soda", label: "Club soda" },
      { id: "chill-juices", label: "Blood-orange juice" },
      { id: "chill-na-aperitif", label: "NA bitter aperitif" },
      { id: "chill-water", label: "Filtered water for lemonades" },
    ],
  },
  {
    id: "party-day",
    title: "Prepare",
    when: "Party day",
    items: [
      { id: "juice-lemons", label: "Juice lemons", detail: "Fine-strain into a labeled squeeze bottle. Best within 8 hours." },
      { id: "juice-limes", label: "Juice limes", detail: "Fine-strain into a labeled squeeze bottle. Best within 8 hours." },
      { id: "cut-lemon", label: "Cut lemon wheels" },
      { id: "cut-lime", label: "Cut lime wedges and wheels" },
      { id: "cut-orange", label: "Slice oranges", detail: "Also cut a few peels for Whiskey on the Rocks." },
      { id: "blueberry-picks", label: "Rinse blueberries and make picks", detail: "3 berries per pick." },
      { id: "salt-plate", label: "Pour a small plate of kosher salt for rims" },
      { id: "ice", label: "Get ice", detail: "Keep a cooler of ice for serving separate from shaking ice." },
      { id: "label-bottles", label: "Label bottles and containers" },
    ],
  },
  {
    id: "bar-setup",
    title: "Bar setup",
    when: "Before guests arrive",
    items: [
      { id: "setup-spirits", label: "Spirits" },
      { id: "setup-liqueurs", label: "Liqueurs and Aperol" },
      { id: "setup-juices", label: "Juices" },
      { id: "setup-syrups", label: "Syrups" },
      { id: "setup-mixers", label: "Mixers on ice" },
      { id: "setup-ice", label: "Ice and scoop" },
      { id: "setup-shaker", label: "Shaker" },
      { id: "setup-jigger", label: "Jigger" },
      { id: "setup-strainer", label: "Strainer" },
      { id: "setup-glasses", label: "Glasses / cups" },
      { id: "setup-towels", label: "Bar towels" },
      { id: "setup-qr", label: "Menu link or QR code where guests can see it" },
    ],
  },
];

export interface SyrupRecipe {
  ingredientId: string;
  name: string;
  /** Roughly how many oz of finished syrup one batch makes. */
  batchYieldOz: number;
  batch: string;
  steps: string;
}

export const SYRUP_RECIPES: SyrupRecipe[] = [
  {
    ingredientId: "simple_syrup",
    name: "Simple syrup",
    batchYieldOz: 12,
    batch: "1 cup sugar + 1 cup water",
    steps: "Stir over low heat until the sugar dissolves. Cool, bottle and refrigerate.",
  },
  {
    ingredientId: "honey_syrup",
    name: "Honey syrup",
    batchYieldOz: 16,
    batch: "1 cup honey + 1 cup hot water",
    steps: "Stir until fully combined. Cool, bottle and refrigerate.",
  },
  {
    ingredientId: "blueberry_syrup",
    name: "Blueberry syrup",
    batchYieldOz: 12,
    batch: "1 cup blueberries + 1 cup sugar + 1 cup water",
    steps: "Simmer 10 minutes, mashing the berries. Fine-strain, cool, bottle and refrigerate.",
  },
];
