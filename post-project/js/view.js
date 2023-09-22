const titleEl = document.querySelector('#title');
const categoryEl = document.querySelector('#category');
const dateEl = document.querySelector('#date');
const contentsEl = document.querySelector('#contents');
const loadingEl = document.querySelector('#loading');
const delBtn = document.querySelector('#del-button');
const editBtn = document.querySelector('#edit-button');

let id = null;

/** 렌더링 */
const render = data => {

  const noneTxt = '내용이 존재하지 않습니다.';
  titleEl.innerHTML = data.title ?? noneTxt;
  categoryEl.innerHTML = data.category ?? noneTxt;
  dateEl.innerHTML = data.date ?? noneTxt;
  contentsEl.innerHTML = data.contents ?? noneTxt;

  setTimeout(() => {
    loadingEl.style.display = 'none';
  }, 500);
}

/** 게시글 정도 가져오기 */
const getData = () => {
  const search = location.search;
  const query = search.replace('?', '');
  id = Number(query.slice(3));
  const local = localStorage.getItem('list');

  if (!id || !local) return history.back;

  const json = JSON.parse(local);
  const find = json.find(item => item.id === id);

  render(find);
}

/** 게시글 삭제하기 */
const delData = () => {
  const local = localStorage.getItem('list');
  const json = JSON.parse(local);
  const filter = json.filter(item => item.id !== id);
  localStorage.setItem('list', JSON.stringify(filter));
  alert('삭제되었습니다.');
  history.back();
}

/** 게시글 수정하기 */

const editDate = () => {
  if(!id) return;
  const search = location.search;
  const query = search.replace('?', '');
  id = Number(query.slice(3));
  let url = 'write.html?id=' + id;
  location.href = url;
}

getData();
delBtn.addEventListener('click', delData);
editBtn.addEventListener('click', editDate);