'use client'

import { Room } from '@/types'
import { Tabs, Input, Button } from 'antd'
import type { TabsProps } from 'antd'
import { useState } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EditOutlined } from '@ant-design/icons'

interface RoomTabsProps {
  rooms: Room[]
  currentRoom: string
  onRoomChange: (roomId: string) => void
  onRoomUpdate: (roomId: string, name: string) => void
  onRoomReorder: (rooms: Room[]) => void
}

interface SortableTabProps {
  id: string
  children: React.ReactNode
}

function SortableTab({ id, children }: SortableTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export function RoomTabs({ rooms, currentRoom, onRoomChange, onRoomUpdate, onRoomReorder }: RoomTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const currentRoomData = rooms.find(room => room.id === currentRoom)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = rooms.findIndex(room => room.id === active.id)
    const newIndex = rooms.findIndex(room => room.id === over.id)
    
    const newRooms = arrayMove(rooms, oldIndex, newIndex)
    onRoomReorder(newRooms)
  }

  const items: TabsProps['items'] = rooms.map((room) => ({
    key: room.id,
    label: (
      <SortableTab id={room.id}>
        {room.name}
      </SortableTab>
    ),
  }))

  const handleSave = () => {
    if (editingName.trim() && editingName !== currentRoomData?.name) {
      onRoomUpdate(currentRoom, editingName)
    }
    setIsEditing(false)
  }

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={rooms.map(room => room.id)} strategy={horizontalListSortingStrategy}>
          <Tabs
            activeKey={currentRoom}
            items={items}
            onChange={onRoomChange}
            className="px-4"
          />
        </SortableContext>
      </DndContext>
      
      {currentRoomData && (
        <div className="px-4 py-2 border-b flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onPressEnter={handleSave}
                autoFocus
              />
              <Button size="small" onClick={() => setIsEditing(false)}>取消</Button>
              <Button size="small" type="primary" onClick={handleSave}>保存</Button>
            </>
          ) : (
            <>
              <span>{currentRoomData.name}</span>
              <Button 
                size="small" 
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingName(currentRoomData.name)
                  setIsEditing(true)
                }}
              >
                编辑
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
} 