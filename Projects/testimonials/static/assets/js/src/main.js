// get required data

let testimonial_data = [];

const jsonFileUrl = '../../../../data/testimonials.json';

async function fetchData() {
  try {
    const response = await fetch(jsonFileUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const testimonials = data['testimonials'];
    return testimonials;
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// get testionial container

const testimonialContainer = document.querySelector('.testimonial-container');

// create dom elements

const createTestimonial = (testimonial) => {    
    const testimonialDiv = document.createElement('div');
    testimonialDiv.setAttribute('id', `${testimonial.id}`);
    testimonialDiv.classList.add('testimonial');
    testimonialDiv.innerHTML = `
    <figure class="testimonial__figure">
      <div class="testimonial__image">
        <img src="${testimonial.logo}" alt="${testimonial.abbreviation}" />
      </div>
      <div class="testimonial__content">
        <blockquote class="testimonial__text">${testimonial.testimonial}</blockquote>
        <h5 class="testimonial__name">-- ${testimonial.name}</h5>
        <figcaption class="testimonial__caption">${testimonial.position}, <cite class="testimonial__cite">${testimonial.company}</cite>
        </figcaption>
      </div>
      </figure>
    `;
    return testimonialDiv;
  }

  // render dom elements and assign data

const fetchAllData = async () => {
  const data = await fetchData();
  console.log("Data loaded" , data);
  testimonial_data = data;
  return testimonial_data;
 
}

const main = async () => {
    const testimonial = await fetchAllData();
    for (i=0; i<testimonial.length; i++) {
        const domeElement = createTestimonial(testimonial[i]);
        testimonialContainer.appendChild(domeElement);
    }  
}

// initialize main function

main();