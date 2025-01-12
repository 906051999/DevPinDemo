'use client'

import { Room } from '@/types'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

interface RoomTabsProps {
  rooms: Room[]
  currentRoom: string
  onRoomChange: (roomId: string) => void
}

export function RoomTabs({ rooms, currentRoom, onRoomChange }: RoomTabsProps) {
  const items: TabsProps['items'] = rooms.map((room) => ({
    key: room.id,
    label: room.name,
  }))

  return (
    <Tabs
      activeKey={currentRoom}
      items={items}
      onChange={onRoomChange}
      className="px-4"
    />
  )
} 