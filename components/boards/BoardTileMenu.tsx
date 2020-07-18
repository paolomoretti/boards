import { BoardTile } from '../../types/boards.types';
import { Menu, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function BoardTileMenu({ tile }: { tile: BoardTile; }) {
  switch (tile.tile_type) {
    case 'link':
      return (
        <Menu>
          <Menu.Item>
            <div style={{position: 'relative'}}>
              <Popconfirm title="Are you sure you want to delete this content?" placement={'top'} icon={<DeleteOutlined style={{ color: 'red' }} />}>
                <a href="#">Delete</a>
              </Popconfirm>
            </div>
          </Menu.Item>
        </Menu>
      )
  }
}