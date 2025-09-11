'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Map,
  Building2,
  MapPin,
  Home,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LocationTreeNode {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city' | 'municipality' | 'neighborhood';
  count?: number;
  children?: LocationTreeNode[];
  parent?: string;
}

interface LocationTreeProps {
  data: LocationTreeNode[];
  onNodeClick?: (node: LocationTreeNode) => void;
  expandedNodes?: Set<string>;
  onToggleExpand?: (nodeId: string) => void;
  className?: string;
}

const LOCATION_ICONS = {
  country: Globe,
  state: Map,
  city: Building2,
  municipality: MapPin,
  neighborhood: Home,
};

const LOCATION_COLORS = {
  country: 'text-blue-600 bg-blue-50',
  state: 'text-green-600 bg-green-50',
  city: 'text-purple-600 bg-purple-50',
  municipality: 'text-orange-600 bg-orange-50',
  neighborhood: 'text-red-600 bg-red-50',
};

const LOCATION_ROUTES = {
  country: '/dashboard/locations/countries',
  state: '/dashboard/locations/states',
  city: '/dashboard/locations/cities',
  municipality: '/dashboard/locations/municipalities',
  neighborhood: '/dashboard/locations/neighborhoods',
};

export function LocationTree({
  data,
  onNodeClick,
  expandedNodes = new Set(),
  onToggleExpand,
  className,
}: LocationTreeProps) {
  const [localExpandedNodes, setLocalExpandedNodes] = useState<Set<string>>(
    new Set()
  );

  const isExpanded = onToggleExpand ? expandedNodes : localExpandedNodes;
  const toggleExpand =
    onToggleExpand ||
    ((nodeId: string) => {
      const newExpanded = new Set(localExpandedNodes);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      setLocalExpandedNodes(newExpanded);
    });

  const renderNode = (node: LocationTreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isNodeExpanded = isExpanded.has(node.id);
    const Icon = LOCATION_ICONS[node.type];
    const colorClass = LOCATION_COLORS[node.type];
    const baseRoute = LOCATION_ROUTES[node.type];

    return (
      <div key={node.id} className="w-full">
        <div
          className={cn(
            'flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors',
            level > 0 && 'ml-6 border-l border-gray-200'
          )}
          style={{ marginLeft: level * 24 }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleExpand(node.id)}
            >
              {isNodeExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          ) : (
            <div className="w-6 h-6" />
          )}

          {/* Icon */}
          <div className={cn('p-1.5 rounded-md', colorClass)}>
            <Icon className="h-3 w-3" />
          </div>

          {/* Name and Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`${baseRoute}?search=${node.name}`}
                className="font-medium text-sm hover:text-blue-600 hover:underline truncate"
                onClick={() => onNodeClick?.(node)}
              >
                {node.name}
              </Link>

              {node.count !== undefined && (
                <Badge variant="secondary" className="text-xs">
                  {node.count}
                </Badge>
              )}
            </div>

            <div className="text-xs text-muted-foreground capitalize">
              {node.type === 'state'
                ? 'Estado/Provincia'
                : node.type === 'city'
                  ? 'Ciudad'
                  : node.type === 'municipality'
                    ? 'Municipio'
                    : node.type === 'neighborhood'
                      ? 'Barrio'
                      : node.type}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              asChild
            >
              <Link href={`${baseRoute}/create?parent=${node.id}`}>
                <Plus className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isNodeExpanded && (
          <div className="ml-2">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('space-y-1', className)}>
      {data.map((node) => renderNode(node))}
    </div>
  );
}

// Sample data generator for demonstration
export const generateSampleLocationTree = (): LocationTreeNode[] => [
  {
    id: 'cuba',
    name: 'Cuba',
    type: 'country',
    count: 15,
    children: [
      {
        id: 'havana-province',
        name: 'La Habana',
        type: 'state',
        count: 8,
        parent: 'cuba',
        children: [
          {
            id: 'havana-city',
            name: 'Ciudad de La Habana',
            type: 'city',
            count: 15,
            parent: 'havana-province',
            children: [
              {
                id: 'plaza',
                name: 'Plaza de la Revolución',
                type: 'municipality',
                count: 12,
                parent: 'havana-city',
                children: [
                  {
                    id: 'vedado',
                    name: 'Vedado',
                    type: 'neighborhood',
                    parent: 'plaza',
                  },
                  {
                    id: 'nuevo-vedado',
                    name: 'Nuevo Vedado',
                    type: 'neighborhood',
                    parent: 'plaza',
                  },
                ],
              },
              {
                id: 'centro-habana',
                name: 'Centro Habana',
                type: 'municipality',
                count: 8,
                parent: 'havana-city',
                children: [
                  {
                    id: 'barrio-chino',
                    name: 'Barrio Chino',
                    type: 'neighborhood',
                    parent: 'centro-habana',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'santiago',
        name: 'Santiago de Cuba',
        type: 'state',
        count: 5,
        parent: 'cuba',
        children: [
          {
            id: 'santiago-city',
            name: 'Santiago de Cuba',
            type: 'city',
            count: 9,
            parent: 'santiago',
          },
        ],
      },
    ],
  },
];
