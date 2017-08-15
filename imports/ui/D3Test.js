import React from 'react';
import d3 from 'd3';
import d3data from './../api/d3data';

import D3Links from './D3Links';
import D3Nodes from './D3Nodes';

class D3Test extends React.Component<Props, {}>{
  ref: HTMLDivElement;
  simulation: any;

  static defaultProps = {
    width: 800,
    height: 600,
    name: "D3"
  }

  constructor(props: Props) {
    super(props);

    // D3 setup the simulation as prop of the class
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d: d3Node) {
        return d.id;
      }))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
      .nodes(d3data.nodes);

    this.simulation.force("link").links(d3data.links);
  }

  componentDidMount(){
    // BASIC EXAMPLE
    // console.log(this.ref);
    // d3.select(this.ref)
    // .append("circle")
    // .attr("r", 5)
    // .attr("cx", this.props.width / 2)         // x position
    // .attr("cy", this.props.height / 2)        // y position
    // .attr("fill", "red");

    const node = d3.select(".nodes").selectAll("circle");
    const link = d3.select(".links").selectAll("line");

    this.simulation.nodes(d3data.nodes).on("tick", ticked);

    function ticked() {
      link
        .attr("x1", function(d: any) {
          return d.source.x;
        })
        .attr("y1", function(d: any) {
          return d.source.y;
        })
        .attr("x2", function(d: any) {
          return d.target.x;
        })
        .attr("y2", function(d: any) {
          return d.target.y;
        });

      node
        .attr("cx", function(d: any) {
          return d.x;
        })
        .attr("cy", function(d: any) {
          return d.y;
        });
    }

  }

  render(){
    return (
      <div>
        <h1>My Test {this.props.name}</h1>
        <svg className="container" width={this.props.width} height={this.props.height}>
          <D3Links links={d3data.links} />
          <D3Nodes nodes={d3data.nodes} simulation={this.simulation} />
        </svg>
      </div>
    );
  }
}



export default D3Test;
