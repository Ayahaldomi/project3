
document.addEventListener('DOMContentLoaded', () => {
  const collapsedData = document.getElementById('collapsedData');

  async function getData() {
    const response = await fetch('../JSON/privcy.json');
        // console.log (response);

      const data = await response.json();
      // console.log(data);


      data.forEach(item => {
        // console.log(item);
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('collapsible');
        // console.log(button.outerHTML);
        button.textContent = item.header;
        // console.log(button)

        const content = document.createElement('div');
        content.classList.add('content');
        // console.log(content.outerHTML);


        if (Array.isArray(item.content)) {
          item.content.forEach(paragraph => {
            const p = document.createElement('p');
            // console.log(p);
            p.textContent = paragraph;
            // console.log(p);
            content.appendChild(p);
          });
        } else {
          const p = document.createElement('p');
          p.textContent = item.content;
          content.appendChild(p);
        }

        collapsedData.appendChild(button);
        collapsedData.appendChild(content);

        button.addEventListener('click', function() {
          this.classList.toggle('active');
          if (content.style.display === 'block') {
            content.style.display = 'none';
          } else {
            content.style.display = 'block';
          }
        });
      });


  }

  getData();
});