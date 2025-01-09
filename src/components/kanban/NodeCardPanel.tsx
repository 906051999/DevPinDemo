import { useNodes } from '@/contexts/NodesContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import NodeCard from './NodeCard';

interface NodeCardPanelProps {
  onOpenDialog: (nodeId: string) => void;
}

export default function NodeCardPanel({ onOpenDialog }: NodeCardPanelProps) {
  const { nodes } = useNodes();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 对nodes按更新时间排序
  const sortedNodes = [...nodes].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  useEffect(() => {
    const handleNodeSelected = (e: CustomEvent<{ nodeId: string }>) => {
      const nodeId = e.detail.nodeId;
      setSelectedNodeId(nodeId);
      
      if (!swiper) return;
      
      const index = nodes.findIndex(n => n.id === nodeId);
      if (index === -1) return;
      
      setCurrentIndex(index);
    };

    window.addEventListener('node-selected', handleNodeSelected as EventListener);
    return () => window.removeEventListener('node-selected', handleNodeSelected as EventListener);
  }, [nodes, swiper]);

  useEffect(() => {
    if (!swiper || !selectedNodeId) return;
    
    const index = sortedNodes.findIndex(n => n.id === selectedNodeId);
    if (index !== -1) {
      swiper.slideTo(index, 500, false);
      if (index === currentIndex) return;
    }
  }, [selectedNodeId, swiper, sortedNodes]);

  return (
    <div className="h-full">
      <Swiper
        onSwiper={setSwiper}
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
        mousewheel={{
          forceToAxis: true,
        }}
        freeMode={{
          enabled: true,
          sticky: false,
          momentumBounce: false,
        }}
        watchSlidesProgress={true}
        className="h-full py-4 px-4"
      >
        {sortedNodes.map((node) => (
          <SwiperSlide 
            key={node.id} 
            className="!w-[250px] transition-transform"
          >
            <NodeCard
              node={node}
              onOpenDialog={onOpenDialog}
              isSelected={selectedNodeId === node.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 