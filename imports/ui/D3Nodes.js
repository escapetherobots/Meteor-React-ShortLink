import React from 'react';
import d3 from 'd3';

class D3Nodes extends React.Component<{nodes: d3Node[], simulation: any}, {}> {
  ref: SVGGElement;

  componentDidMount(){
    const context: any = d3.select(this.ref);
    const simulation = this.props.simulation;
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    context.selectAll("circle")
      .data(this.props.nodes)
      .enter().append("circle")
      .attr("r", 7)
      .attr("fill", function(d: d3Node) {
        return color(d.group.toString());
      })
      .call(d3.drag()
          .on("start", onDragStart)
          .on("drag", onDrag)
          .on("end", onDragEnd))
      .append("title")
        .text(function(d: d3Node) {
          return d.id;
        });

    function onDragStart(d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function onDrag(d: any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function onDragEnd(d: any) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }

  render(){
    return (
      <g className="nodes" ref={(ref: SVGGElement) => this.ref = ref}/>
    );
  }
}

export default D3Nodes;
