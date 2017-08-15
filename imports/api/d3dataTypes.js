type d3Node = {
  id: string,
  group: number
};

type d3Link = {
  source: string,
  target: string,
  value: number
};

type Graph = {
  nodes: d3Node[],
  links: d3Link[]
};

// One important thing to note is that when you set variables
// from a D3 operator, the variable type will need to be set to any.
// This is because D3 types can be a bit lengthy to use unless you extend,
// and in some cases, they will cause a possible variable undefined error.
