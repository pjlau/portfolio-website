// 專案過濾功能
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.project-filter button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 表單提交處理
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('感謝您的訊息！已成功送出！');
        form.reset();
      } else {
        alert('送出失敗，請稍後再試。');
      }
    } catch (error) {
      console.error('錯誤：', error);
      alert('發生錯誤，請檢查控制台並重試。');
    }
  });
});