import React, { FC } from 'react';
import Badge from '#renderer/components/shared/badge/badge.tsx';
import { SubjectGroup } from '#renderer/store/SubjectGroupsStore.ts';

interface ISubjectGroupBadge {
  group?: SubjectGroup;
}

const SubjectGroupBadge: FC<ISubjectGroupBadge> = ({ group }) => {
  return (
    <div>
      <Badge
        text={group?.name ?? 'New Group'}
        badgeStyle={group?.style}
      />
    </div>
  );
};

export default SubjectGroupBadge;
