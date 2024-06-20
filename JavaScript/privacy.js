
document.addEventListener('DOMContentLoaded', () => {
    const collapsedData = document.getElementById('collapsedData');

    async function getData() {
      const response = await fetch('../JSON/privcy.json'); 
      if (response.ok) {
        const data = await response.json();
        
        
        data.forEach(item => {
          
          const button = document.createElement('button');
          button.type = 'button';
          button.classList.add('collapsible');
          button.textContent = item.header;

          const content = document.createElement('div');
          content.classList.add('content');

          if (Array.isArray(item.content)) {
            item.content.forEach(paragraph => {
              const p = document.createElement('p');
              p.textContent = paragraph;
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
      } else {
        console.error('Network response was not ok');
      }
    }

    getData();
  });