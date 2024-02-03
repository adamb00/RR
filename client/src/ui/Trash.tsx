import TrashIcon from '../../assets/icons8-trash.svg';
import TrashSound from '../../assets/crumple-03-40747.mp3';
import { useDrop } from 'react-dnd';
import { useDeleteOneLink } from '../features/Links/useLinks';
import { memo } from 'react';

export default memo(function Trash() {
   const { deleteLink } = useDeleteOneLink();
   const audio = new Audio(TrashSound);

   const [{ isOver }, drop] = useDrop(() => ({
      accept: 'BOX',

      drop: (item: { id: string }) => {
         deleteLink(item.id);
         audio.play();
      },

      collect: monitor => ({
         isOver: monitor.isOver(),
         canDrop: monitor.canDrop(),
      }),
   }));

   return (
      <div className='trash' ref={drop}>
         <img
            src={TrashIcon}
            alt='trash'
            className='trash__icon'
            style={{
               height: isOver ? '12rem' : '10rem',
               width: isOver ? '12rem' : '10rem',
            }}
         />
      </div>
   );
});
