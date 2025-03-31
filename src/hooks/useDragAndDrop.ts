
import { useState } from 'react';

export const useDragAndDrop = (
  onDragEnd: (
    sourceIndex: number, 
    destinationIndex: number, 
    sourceType: 'pending' | 'completed', 
    destinationType: 'pending' | 'completed'
  ) => void
) => {
  const [dragging, setDragging] = useState<string | null>(null);
  const [sourceListType, setSourceListType] = useState<'pending' | 'completed'>('pending');

  const handleDragStart = (
    event: React.DragEvent<HTMLElement>, 
    id: string, 
    index: number, 
    listType: 'pending' | 'completed'
  ) => {
    // Store the source index, id, and list type
    const data = JSON.stringify({
      id,
      index,
      listType
    });
    
    event.dataTransfer.setData('text/plain', data);
    event.dataTransfer.effectAllowed = 'move';
    setDragging(id);
    setSourceListType(listType);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLElement>, 
    destinationIndex: number,
    destinationListType: 'pending' | 'completed'
  ) => {
    event.preventDefault();
    
    try {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'));
      const sourceIndex = data.index;
      const sourceType = data.listType;
      
      // If dropping at the same position in the same list, do nothing
      if (sourceType === destinationListType && sourceIndex === destinationIndex) {
        return;
      }
      
      onDragEnd(sourceIndex, destinationIndex, sourceType, destinationListType);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
    
    setDragging(null);
  };

  return {
    dragging,
    sourceListType,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
  };
};
