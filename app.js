// 1. Raw JSON Dataset (Hierarchical Structure)
const familyData = {
    name: "Arthur Pendelton (Grandfather)",
    children: [
        {
            name: "Robert Pendelton (Father)",
            children: [
                { name: "Alex Pendelton (You)" },
                { name: "Chris Pendelton (Sibling)" }
            ]
        },
        {
            name: "Sarah Pendelton (Aunt)",
            children: [
                { name: "Taylor Smith (Cousin)" }
            ]
        }
    ]
};

// 2. Set dimensions and margins for the diagram
const container = document.getElementById('tree-container');
const width = container.clientWidth;
const height = container.clientHeight;

// 3. Create SVG canvas
const svg = d3.select("#tree-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50, 50)");

// 4. Declare a tree layout and assign size
const treeLayout = d3.tree().size([height - 100, width - 200]);

// 5. Convert JSON into D3 hierarchy format
const root = d3.hierarchy(familyData);

// 6. Assign (x, y) positions to every person
treeLayout(root);

// 7. Draw connection lines (links) between parents and children
svg.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
    );

// 8. Create node groups for people
const node = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.y},${d.x})`);

// 9. Add circles for each person
node.append('circle')
    .attr('r', 8);

// 10. Add name labels next to circles
node.append('text')
    .attr('dy', '.35em')
    .attr('x', d => d.children ? -12 : 12)
    .attr('text-anchor', d => d.children ? 'end' : 'start')
    .text(d => d.data.name);
