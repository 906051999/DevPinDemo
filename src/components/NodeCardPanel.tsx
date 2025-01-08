import { useNodes } from '@/contexts/NodesContext';
import NodeCard from './NodeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

interface NodeCardPanelProps {
  onOpenDialog: (nodeId: string) => void;
}

export default function NodeCardPanel({ onOpenDialog }: NodeCardPanelProps) {
  const { nodes } = useNodes();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    const handleNodeSelected = (e: CustomEvent<{ nodeId: string }>) => {
      const nodeId = e.detail.nodeId;
      setSelectedNodeId(nodeId);
      
      if (!swiper) return;
      
      const index = nodes.findIndex(n => n.id === nodeId);
      if (index === -1) return;

      // 计算目标滚动位置
      const slideWidth = 250; // slide 宽度
      const containerWidth = swiper.el.clientWidth;
      const targetOffset = index * slideWidth;
      const centeredOffset = (containerWidth - slideWidth) / 2;
      
      swiper.slideTo(index, 300, false);
    };

    window.addEventListener('node-selected', handleNodeSelected as EventListener);
    return () => window.removeEventListener('node-selected', handleNodeSelected as EventListener);
  }, [nodes, swiper]);

  return (
    <div className="h-full">
      <Swiper
        onSwiper={setSwiper}
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={16}
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
        {nodes.map((node) => (
          <SwiperSlide 
            key={node.id} 
            className="!w-[250px] transition-transform"
          >
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