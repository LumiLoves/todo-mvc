class TodoFormView {
  constructor({ form, textInput }) {
    this.form = form;
    this.textInput = textInput;

    this.handleSubmit = null;
    this.init();
  }
  init() {
    this.textInput.focus();
    this.registerEvents();
  }
  resetInput() {
    this.textInput.value = '';
  }

  registerEvents() {
    this.form.addEventListener('submit', (e) => e.preventDefault());
    this.form.addEventListener('submit', this._onSubmit.bind(this));
  }
  _onSubmit() {
    const todoText = this.textInput.value;

    if (!todoText) { return; }
    this.resetInput();
    if (typeof this.handleSubmit === 'function') { this.handleSubmit(todoText); }
  }
}


class TodoListView {
  constructor({ wrapper }) {
    this.wrapper = wrapper;
  }

  getListsDOM() {
    return this.wrapper.querySelectorAll('li');
  }

  render(todos) {
    const resultTodosHTML = this._makeListHtmlAll(todos); // ? 이런것도 메서드로?
    this.wrapper.innerHTML = resultTodosHTML;
  }
  _makeListHtmlAll(todoMap) {
    return Array.from(todoMap).reduce((acc, todoMapElem) => {
      const todoMapValue = todoMapElem[1];
      return acc += `<li>${todoMapValue.text}</li>`;
    }, '');
  }

  toggleStatus(isOpened) {
    if (isOpened) {
      this._setOpenStatus();
    } else {
      this._setCloseStatus();
    }
  }
  _setOpenStatus() {
    this.wrapper.dataset.openStatus = 'true';
  }
  _setCloseStatus() {
    this.wrapper.dataset.openStatus = 'false';
  }
}


class TodoCollapsedBtnView {
  constructor({ btn }) {
    this.btn = btn;
    this.actionTxt = btn.querySelector('.action-txt');
    this.actionTxtMap = { open: '열기', close: '접기' };

    this.handleClick = null;
    this.init();
  }
  init() {
    this.registerEvents();
  }

  toggleTxt(isOpened) {
    if (isOpened) {
      this._updateActionTxt(this.actionTxtMap.close);
    } else {
      this._updateActionTxt(this.actionTxtMap.open);
    }
  }
  _updateActionTxt(txt) {
    this.actionTxt.innerText = txt;
  }

  registerEvents() {
    this.btn.addEventListener('click', this._onClick.bind(this));
  }
  _onClick() {
    if (typeof this.handleClick === 'function') { this.handleClick(); }
  }
}



