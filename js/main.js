// 專案過濾功能（保持不變）
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

  // 表單提交處理（更新為 Formspree 整合）
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();  // 仍然阻止默認提交，以使用自定義邏輯
    
    const formData = new FormData(form);  // 收集表單資料，包括 name 屬性
    
    try {
      const response = await fetch(form.action, {  // 使用 form.action (Formspree end point)
        method: 'POST',
        body: formData,  // 直接發送 FormData，無需額外 headers（Formspree 支援）
        headers: {
          'Accept': 'application/json'  // 請求 JSON 回應，用於檢查成功
        }
      });

      if (response.ok) {
        const data = await response.json();  // 解析回應
        if (data.ok) {  // Formspree 成功時返回 { ok: true }
          alert('感謝您的訊息！已成功送出到我的 E-mail！');  // 新回應
          form.reset();  // 清空表單
        } else {
          alert('送出失敗，請檢查資料並重試。');
        }
      } else {
        alert('伺服器錯誤，請稍後再試。');
      }
    } catch (error) {
      console.error('錯誤：', error);
      alert('發生網路錯誤，請檢查連線並重試。');
    }
  });
});