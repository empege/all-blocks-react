// Nije u upotrebi trenutno xD
const reducer = (state, action) => {

  // Selectors
  const accordion = {};
  accordion.selectors = {
    header: '.js-accordion-header',
    content: '.js-accordion-content',
    paragraph: '.js-accordion-paragraph',
    icon: '.js-acordion-icon',
  }

  if (action.type === 'TOGGLE_ACCORDION_ITEM') {
    console.log(action.payload.target);
    const e = action.payload;
    console.log(action.payload.target)
    const accordionItem = e.currentTarget.parentElement;
    const header = e.currentTarget;
    const content = accordionItem.querySelector(accordion.selectors.content);
    const paragraph = content.querySelector(accordion.selectors.paragraph);
    const paragraphHeight = paragraph.offsetHeight;
    const icons = accordionItem.querySelectorAll(accordion.selectors.icon);
    if ([...header.classList].includes('accordion__header--active')) {
      header.classList.remove('accordion__header--active');
      content.style.maxHeight = 0;
      icons[0].classList.add('display-none')
      icons[1].classList.remove('display-none')
    } else {
      header.classList.add('accordion__header--active');
      content.style.maxHeight = `${paragraphHeight + 40}px`;
      icons[0].classList.remove('display-none')
      icons[1].classList.add('display-none')
    }
  }

  // if (action.type === 'REMOVE_ALL') {
  //   return { ...state, items: [] }
  // }
  // if (action.type === 'REMOVE_ITEM') {
  //   return { ...state, items: state.items.filter(item => item.id !== action.payload) }
  // }
  // if (action.type === 'FETCH_ITEMS') {
  //   return { ...state, items: action.payload }
  // }

  // if (action.type === 'TOTAL_AMOUNT_AND_PRICE') {
  //   let { amount, price } = state.items.reduce((total, current) => {
  //     const { amount, price } = current;
  //     total.amount += amount;
  //     total.price += price * amount;
  //     return total
  //   }, {
  //     amount: 0,
  //     price: 0
  //   });
  //   price = parseFloat(price.toFixed(2))

  //   return { ...state, totalAmount: amount, totalPrice: price }
  // }

  // if (action.type === 'INCREMENT') {
  //   const items = state.items.map(current => {
  //     if (current.id === action.payload) {
  //       return { ...current, amount: current.amount + 1 };
  //     }
  //     return current;
  //   })
  //   return { ...state, items }
  // }

  // if (action.type === 'DECREMENT') {
  //   const items = state.items.map(current => {
  //     if (current.id === action.payload) {
  //       return { ...current, amount: current.amount - 1 };
  //     }
  //     return current;
  //   })
  //     .filter(current => current.amount !== 0)
  //   return { ...state, items }
  // }


}

export default reducer;