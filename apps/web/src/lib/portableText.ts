export type PortableTextBlock = {
  _key?: string;
  _type: "block";
  children: Array<{
    _key?: string;
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href: string;
  }>;
  style?: string;
};

export type PortableTextImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type BlockContent = Array<PortableTextBlock | PortableTextImage>;
