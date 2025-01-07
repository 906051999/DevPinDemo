import { useNodes } from '@/contexts/NodesContext';
import NodeCard from './NodeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useEffect, useState } from 'react';

interface NodeCardPanelProps {
  onOpenDialog: (nodeId: string) => void;
}

export default function NodeCardPanel({ onOpenDialog }: NodeCardPanelProps) {
  const { nodes } = useNodes();
  const [swiperRef, setSwiperRef] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
    const handleNodeSelected = (e) => {
      const nodeId = e.detail.nodeId;
      setSelectedNodeId(nodeId);
      
      // 找到节点索引
      const index = nodes.findIndex(n => n.id === nodeId);
      if (index > -1 && swiperRef) {
        // 滚动到对应位置
        swiperRef.slideTo(index);
      }
    };

    window.addEventListener('node-selected', handleNodeSelected);
    return () => window.removeEventListener('node-selected', handleNodeSelected);
  }, [nodes, swiperRef]);

  return (
    <div className="h-full">
      <Swiper
        onSwiper={setSwiperRef}
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        className="h-full py-4 px-4"
      >
        {nodes.map((node) => (
          <SwiperSlide key={node.id} className="!w-[250px]">
            <NodeCard
              node={node}
              onOpenDialog={onOpenDialog}
              isSelected={node.id === selectedNodeId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 