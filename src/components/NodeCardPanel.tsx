import { useNodes } from '@/contexts/NodesContext';
import NodeCard from './NodeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

interface NodeCardPanelProps {
  onOpenDialog: (nodeId: string) => void;
}

export default function NodeCardPanel({ onOpenDialog }: NodeCardPanelProps) {
  const { nodes } = useNodes();

  return (
    <div className="h-full">
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        className="h-full py-4 px-4"
      >
        {nodes.map((node) => (
          <SwiperSlide key={node.id} className="!w-[200px]">
            <NodeCard
              node={node}
              onOpenDialog={onOpenDialog}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 