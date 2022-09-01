import { Modal } from './modalPlugin.js';

// class ModalSign extends Modal {
//    constructor(options) {
//       super(options);
//    }
// }

export function sign() {
   const mSign = new Modal(
      {
         isOpen: (modal) => {
            console.log(modal);
            console.log('opened');
         },
         isClose: () => {
            console.log('closed');
         },
      }
   )
}
