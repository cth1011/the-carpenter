import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

export const revalidateLandingPage: GlobalAfterChangeHook = ({ doc }) => {
  console.log('Revalidating Landing Page')
  revalidatePath('/')
  return doc
}

export const revalidateLayout: GlobalAfterChangeHook = ({ doc }) => {
  console.log('Revalidating Layout')
  revalidatePath('/', 'layout')
  return doc
}

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  const slug = doc.slug
  console.log(`Revalidating Page: /${slug}`)

  if (slug === 'home') {
    revalidatePath('/')
  } else {
    revalidatePath(`/${slug}`)
  }

  // Also revalidate previous slug if it changed
  if (previousDoc && previousDoc.slug && previousDoc.slug !== slug) {
    console.log(`Revalidating Previous Page: /${previousDoc.slug}`)
    if (previousDoc.slug === 'home') revalidatePath('/')
    else revalidatePath(`/${previousDoc.slug}`)
  }

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const slug = doc.slug
  console.log(`Revalidating Deleted Page: /${slug}`)

  if (slug === 'home') {
    revalidatePath('/')
  } else {
    revalidatePath(`/${slug}`)
  }
  return doc
}

export const revalidateProduct: CollectionAfterChangeHook = ({ doc }) => {
  console.log(`Revalidating Product: /products/${doc.id}`)
  revalidatePath(`/products/${doc.id}`)
  revalidatePath('/products')
  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook = ({ doc }) => {
  console.log(`Revalidating Deleted Product: /products/${doc.id}`)
  revalidatePath(`/products/${doc.id}`)
  revalidatePath('/products')
  return doc
}

export const revalidateCategory: CollectionAfterChangeHook = ({ doc }) => {
  console.log('Revalidating Category (clearing products listing)')
  revalidatePath('/products')
  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook = ({ doc }) => {
  console.log('Revalidating Deleted Category (clearing products listing)')
  revalidatePath('/products')
  return doc
}
