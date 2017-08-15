import React from 'react';
import d3 from 'd3';

class D3Links extends React.Component<{links: d3Link[]}, {}> {
  ref: SVGGElement;

  componentDidMount(){
    const context: any = d3.select(this.ref);
    context
      .selectAll("line")
      .data(this.props.links)
      .enter().append("line")
      .attr("stroke-width", function(d: d3Link) {
        return Math.sqrt(d.value);
      });
  }

  render(){
    return (
      <g className="links" ref={ (ref: SVGGElement) => this.ref = ref }/>
    );
  }
}

export default D3Links;
