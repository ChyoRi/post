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
  
  !idKey ? create() : update(idKey);
}

const createId = () => {
  return new Date().getTime();
}

/** 유효성 검사 */
const validate = (data) => {
  if (!titleEl.value) return titleEl.focus();
  if (!categoryEl.value) return categoryEl.focus();
  if (!contentsEl.value) return contentsEl.focus();
  console.log(data);

  // submit(data);
}

/** 데이터 생성 */
const create = () => {
  console.log('생성 페이지 입니다.');
  const id = createId();
  const title = titleEl.value;
  const category = categoryEl.value;
  const contents = contentsEl.value;
  const date = new Date().toLocaleDateString();

  const data = { id, title, category, contents, date };
  console.log(data);

  validate(data);
  
}

/** 데이터 수정 */
const update = (idKey) => {
  console.log('업데이트 페이지 입니다.');
  const list = JSON.parse(localStorage.getItem('list') ?? '[]');
  let listIdx = list.findIndex(item => item.id === idKey);
  const editTitle = titleEl.value = `${list[listIdx].title}`;
  const editCategory = categoryEl.value = `${list[listIdx].category}`;
  const eidtcontents = contentsEl.value = `${list[listIdx].contents}`;

  const updateData = {editTitle, editCategory, eidtcontents};
  
  validate(updateData);
}

/** 데이터 저장 */
const submit = (data) => {
  const list = JSON.parse(localStorage.getItem('list') ?? '[]');

  if(!data || list) {
    titleEl.focus();
  } else {
    localStorage.setItem('list', JSON.stringify([...list, data]));
    history.back();
    alert('저장 되었습니다.');
  }
}

discrimination();
submitBtn.addEventListener('click', validate);