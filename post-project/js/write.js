const titleEl = document.querySelector('#title');
const categoryEl = document.querySelector('#category');
const contentsEl = document.querySelector('#contents');
const submitBtn = document.querySelector('#submit');

let idKey = 0;

/** id가 있는지 없는지 판별 */
const discrimination = () => {
  const search = location.search;
  const query = search.replace('?', '');
  idKey = Number(query.slice(3));
  
  if(!idKey) {
    create();
  } else {
    update(idKey);
  }
}

const createId = () => {
  return new Date().getTime();
}

/** 유효성 검사 */
const validate = () => {
  if (!titleEl.value) return titleEl.focus();
  if (!categoryEl.value) return categoryEl.focus();
  if (!contentsEl.value) return contentsEl.focus();

  create();
}

/** 데이터 저장 */
const create = () => {
  const id = createId();
  const title = titleEl.value;
  const category = categoryEl.value;
  const contents = contentsEl.value;
  const date = new Date().toLocaleDateString();

  const data = { id, title, category, contents, date};

  const list = JSON.parse(localStorage.getItem('list') ?? '[]');
  localStorage.setItem('list', JSON.stringify([...list, data]));
  alert('저장되었습니다.');
  history.back();
}

/** 데이터 수정 */
const update = (data) => {
  console.log('업데이트 페이지 입니다.');
}

discrimination();
submitBtn.addEventListener('click', validate);