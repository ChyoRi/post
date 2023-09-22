const tbody = document.querySelector('tbody');
let list = [];

/** 랜더링 */
const render = () => {
  tbody.innerHTML = '';

  // 항목이 없을 때
  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="none">항목이 없습니다.</td>
      </tr>
    `
  };

  let tag = '';
  list.forEach((item, i) => {
    tag += `
      <tr data-id="${item.id}">
        <td>${i + 1}</td>
        <td>${item.category ?? '-'}</td>
        <td>${item.title ?? '-'}</td>
        <td>${item.date ?? '-'}</td>
      </tr>
    `;
  });

  tbody.innerHTML = tag;
  
  const trList = document.querySelectorAll('tbody > tr');
  trList.forEach(item => {
    item.addEventListener('click', (e) => {
      let target = e.currentTarget;
      let id = target.getAttribute('data-id');
      let url = 'view.html?id=' + id;
      location.href = url;
    })
  })
}

/** 리스트 조회 */
const getList = () => {
  let local = localStorage.getItem('list');
  if (!local) {
    list = [];
  } else {
    try {
      let json = JSON.parse(local);
      list = [...json];
    } catch {
      list = [];
    }
    
  }

  render();
}

getList();