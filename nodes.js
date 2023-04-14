const nodes = [
  { id: "Project 1", group: 1 },
  { id: "Project 2", group: 1 },
  { id: "Project 3", group: 1 },
  { id: "Skill 1", group: 2 },
  { id: "Skill 2", group: 2 },
  { id: "Skill 3", group: 2 },
];

const links = [
  { source: "Project 1", target: "Skill 1" },
  { source: "Project 1", target: "Skill 2" },
  { source: "Project 2", target: "Skill 1" },
  { source: "Project 3", target: "Skill 3" },
];

const svg = d3
  .select("#network")
  .append("svg")
  .attr("width", 600)
  .attr("height", 400);
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(300, 200));

const link = svg
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .attr("stroke-width", 2);

const node = svg
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 10)
  .attr("fill", (d) => (d.group === 1 ? "#0f0" : "#f00"))
  .call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background-color", "#222")
  .style("color", "#0f0")
  .style("padding", "5px")
  .style("border-radius", "5px")
  .style("pointer-events", "none");

simulation.nodes(nodes).on("tick", ticked);

function ticked() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
}

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

node
  .on("mouseover", (event, d) => {
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip
      .html(d.id)
      .style("left", event.pageX + "px")
      .style("top", event.pageY + "px");
  })
  .on("mousemove", (event, d) => {
    tooltip.style("left", event.pageX + "px").style("top", event.pageY + "px");
  })
  .on("mouseout", (event, d) => {
    tooltip.transition().duration(200).style("opacity", 0);
  });
