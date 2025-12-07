import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PeriodTabs,
} from '@spinozaos/react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab navigation component. Extracted from Substance Leaderboard patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic Tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">Overview content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">Analytics content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">Settings content goes here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// Pills Variant
export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full max-w-md">
      <TabsList variant="pills">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <p className="text-neutral-400">All items</p>
      </TabsContent>
      <TabsContent value="active" className="mt-4">
        <p className="text-neutral-400">Active items only</p>
      </TabsContent>
      <TabsContent value="archived" className="mt-4">
        <p className="text-neutral-400">Archived items</p>
      </TabsContent>
    </Tabs>
  ),
};

// Underline Variant
export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="posts" className="w-full max-w-md">
      <TabsList variant="underline">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="mt-4">
        <p className="text-neutral-400">Your posts</p>
      </TabsContent>
      <TabsContent value="comments" className="mt-4">
        <p className="text-neutral-400">Your comments</p>
      </TabsContent>
      <TabsContent value="likes" className="mt-4">
        <p className="text-neutral-400">Your liked content</p>
      </TabsContent>
    </Tabs>
  ),
};

// Segment Variant
export const Segment: Story = {
  render: () => (
    <Tabs defaultValue="day" className="w-full max-w-sm">
      <TabsList variant="segment">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day" className="mt-4">
        <p className="text-neutral-400">Daily view</p>
      </TabsContent>
      <TabsContent value="week" className="mt-4">
        <p className="text-neutral-400">Weekly view</p>
      </TabsContent>
      <TabsContent value="month" className="mt-4">
        <p className="text-neutral-400">Monthly view</p>
      </TabsContent>
    </Tabs>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <div>
        <p className="text-xs text-neutral-500 mb-2">Small</p>
        <Tabs defaultValue="a">
          <TabsList size="sm">
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
            <TabsTrigger value="c">Tab C</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Medium (default)</p>
        <Tabs defaultValue="a">
          <TabsList size="md">
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
            <TabsTrigger value="c">Tab C</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">Large</p>
        <Tabs defaultValue="a">
          <TabsList size="lg">
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
            <TabsTrigger value="c">Tab C</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

// Animated Content
export const AnimatedContent: Story = {
  render: () => (
    <Tabs defaultValue="first" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="first">First</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
        <TabsTrigger value="third">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="first" animated className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">First tab with animation</p>
        </div>
      </TabsContent>
      <TabsContent value="second" animated className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">Second tab with animation</p>
        </div>
      </TabsContent>
      <TabsContent value="third" animated className="mt-4">
        <div className="p-4 bg-white/5 border border-white/10">
          <p className="text-neutral-400">Third tab with animation</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// Period Tabs Preset
export const PeriodTabsPreset: Story = {
  render: function PeriodTabsStory() {
    const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all');
    return (
      <div className="space-y-4">
        <PeriodTabs value={period} onChange={setPeriod} />
        <p className="text-neutral-400">Selected: {period}</p>
      </div>
    );
  },
};

// In Context - Leaderboard Header
export const LeaderboardContext: Story = {
  render: function LeaderboardStory() {
    const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all');
    return (
      <div className="p-6 bg-void border border-white/10 max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-spinoza-yellow/10 border border-spinoza-yellow/30 flex items-center justify-center">
              <span className="text-spinoza-yellow">🏆</span>
            </div>
            <div>
              <h2 className="text-xl font-serif text-white">Leaderboard</h2>
              <p className="text-xs font-mono text-neutral-500">Top Predictors</p>
            </div>
          </div>
        </div>
        <PeriodTabs value={period} onChange={setPeriod} />
        <div className="mt-4 text-center py-8 text-neutral-500">
          Showing {period === 'all' ? 'all time' : period === 'month' ? 'this month' : 'this week'} rankings
        </div>
      </div>
    );
  },
};
