const jsonGPGUrl = '/gender_paygap_json_data';
const canvasWidth = 900;
const canvasHeight = 550;
const margin = { top: 100, right: 150, bottom: 100, left: 150 };
const width = canvasWidth + margin.left - margin.right;
const height = canvasHeight + margin.top - margin.bottom;
const animation = { duration: 500, delay: 500, ease: d3.easeLinear };

const canvas = d3.select("#casestudies-d3-canvas")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("viewBox", [0, 0, width, height])
    .attr("transform", "translate(100, 20)");

const fetchGPGData = async () => {
    try {
        const response = await fetch(jsonGPGUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GPG data:', error.message);
    }
};

const gender_pay_gap_main = async () => {
  const gpg_data = await fetchGPGData();
  const filteredData = gpg_data.filter(d => d['workType'] === 'Full Time');

  const xScale = d3.scaleLinear().domain([0, width / 18]).range([margin.left, (width - margin.right)]);
  const yScale = d3.scaleBand().domain(filteredData.map(d => d.jobCategories)).range([0, height]);

const createAxes = (data) => {

    const xAxis = d3.axisTop(xScale).ticks(10).tickFormat(d => "£" + d);
    const yAxis = d3.axisLeft(yScale);

    canvas.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis)
        .attr("color", "#1f135d")
        .attr("font-style", "bold");

    canvas.append("g")
        .attr("class", "y-axis")
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
        .attr("color", "#1f135d")
        .attr("font-style", "bold");
};

    createAxes(filteredData);

    const malePerson = canvas.selectAll("image")
        .data(filteredData)
        .enter()
        .append("g")
        ;

    malePerson.append("image")
    // appliy animation to the malePerson
        .transition()
        .duration(animation.duration)
        .delay((d, i) => i * animation.delay)
        .ease(animation.ease)
        .attr('x', -10)
        .attr('y', 0)
        .transition()
        .duration(animation.duration)
        .delay((d, i) => i * animation.delay)
        .ease(animation.ease)
        .attr('x', d => xScale(d['maleMedianHourlyRate']))
        .attr('y', d => yScale(d.jobCategories))
        .attr("xlink:href", d => d.maleImagePath)
        .attr("class", "businessPerson")
        .attr("id","malePerson")
        ;

        // append title to malePerson
        d3.selectAll(malePerson)
        .append("title")
        .attr("class", "tooltip")
        .text(d => `${d['jobCategories']} - £${d['maleMedianHourlyRate']}`);

    const femalePerson = malePerson.append("image")
        // appliy animation to the femalePerson
        .transition()
        .duration(animation.duration)
        .delay((d, i) => i * animation.delay)
        .ease(animation.ease)
        .attr('x', d => 2* xScale(d['femaleMedianHourlyRate']))
        .attr('y', 0)
        .transition()
        .duration(animation.duration)
        .delay((d, i) => i * animation.delay)
        .ease(animation.ease)
        .attr('x', d => xScale(d['femaleMedianHourlyRate']))
        .attr('y', d => yScale(d.jobCategories))
        .attr("xlink:href", d => d.femaleImagePath)
        .attr("class", "businessPerson")
        .attr("id","femalePerson")
        ;

// append title to femalePerson
        d3.selectAll(femalePerson)
        .append("title")
        .attr("class", "tooltip")
        .text(d => `${d['jobCategories']} - £${d['femaleMedianHourlyRate']}`);

};

gender_pay_gap_main();