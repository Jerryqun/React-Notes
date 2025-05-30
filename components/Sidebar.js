/* eslint-disable @next/next/no-img-element */
import React, { Suspense } from 'react';
import Link from 'next/link';
import { getAllNotes } from '@/lib/redis';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarSearchField from '@/components/SidebarSearchField';

export default async function Sidebar() {
  const notes = await getAllNotes();
  return (
    <>
      <section className='col sidebar'>
        <Link href={'/'} className='link--unstyled'>
          <section className='sidebar-header'>
            <img
              className='logo'
              src='/logo.svg'
              width='22px'
              height='20px'
              alt=''
              role='presentation'
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList notes={notes} />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
