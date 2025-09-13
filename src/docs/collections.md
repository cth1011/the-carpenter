# Collection Configs

A Collection is a group of records, called Documents, that all share a common schema. You can define as many Collections as your application needs. Each Document in a Collection is stored in the Database based on the Fields that you define, and automatically generates a Local API, REST API, and GraphQL API used to manage your Documents.

Collections are also used to achieve Authentication in Payload. By defining a Collection with auth options, that Collection receives additional operations to support user authentication.

Collections are the primary way to structure recurring data in your application, such as users, products, pages, posts, and other types of content that you might want to manage. Each Collection can have its own unique Access Control, Hooks, Admin Options, and more.

To define a Collection Config, use the collection property in your Payload Config:

import { buildConfig } from 'payload'

export default buildConfig({
// ...
collections: [

    // Your Collections go here

],
})
Tip: If your Collection is only ever meant to contain a single Document, consider using a Global instead.

Config Options
It's often best practice to write your Collections in separate files and then import them into the main Payload Config.

Here is what a simple Collection Config might look like:

import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
slug: 'posts',
fields: [
{
name: 'title',
type: 'text',
},
],
}
Reminder: For more complex examples, see the Templates and Examples directories in the Payload repository.

The following options are available:

Option

Description

admin

The configuration options for the Admin Panel. More details.

access

Provide Access Control functions to define exactly who should be able to do what with Documents in this Collection. More details.

auth

Specify options if you would like this Collection to feature authentication. More details.

custom

Extension point for adding custom data (e.g. for plugins)

disableDuplicate

When true, do not show the "Duplicate" button while editing documents within this Collection and prevent duplicate from all APIs.

defaultSort

Pass a top-level field to sort by default in the Collection List View. Prefix the name of the field with a minus symbol ("-") to sort in descending order. Multiple fields can be specified by using a string array.

dbName

Custom table or Collection name depending on the Database Adapter. Auto-generated from slug if not defined.

endpoints

Add custom routes to the REST API. Set to false to disable routes. More details.

fields \*

Array of field types that will determine the structure and functionality of the data stored within this Collection. More details.

graphQL

Manage GraphQL-related properties for this collection. More

hooks

Entry point for Hooks. More details.

orderable

If true, enables custom ordering for the collection, and documents can be reordered via drag and drop. Uses fractional indexing for efficient reordering.

labels

Singular and plural labels for use in identifying this Collection throughout Payload. Auto-generated from slug if not defined.

enableQueryPresets

Enable query presets for this Collection. More details.

lockDocuments

Enables or disables document locking. By default, document locking is enabled. Set to an object to configure, or set to false to disable locking. More details.

slug \*

Unique, URL-friendly string that will act as an identifier for this Collection.

timestamps

Set to false to disable documents' automatically generated createdAt and updatedAt timestamps.

trash

A boolean to enable soft deletes for this collection. Defaults to false. More details.

typescript

An object with property interface as the text used in schema generation. Auto-generated from slug if not defined.

upload

Specify options if you would like this Collection to support file uploads. For more, consult the Uploads documentation.

versions

Set to true to enable default options, or configure with object properties. More details.

defaultPopulate

Specify which fields to select when this Collection is populated from another document. More Details.

indexes

Define compound indexes for this collection. This can be used to either speed up querying/sorting by 2 or more fields at the same time or to ensure uniqueness between several fields.

forceSelect

Specify which fields should be selected always, regardless of the select query which can be useful that the field exists for access control / hooks

disableBulkEdit

Disable the bulk edit operation for the collection in the admin panel and the REST API

- An asterisk denotes that a property is required.

Fields
Fields define the schema of the Documents within a Collection. To learn more, go to the Fields documentation.

Access Control
Collection Access Control determines what a user can and cannot do with any given Document within a Collection. To learn more, go to the Access Control documentation.

Hooks
Collection Hooks allow you to tie into the lifecycle of your Documents so you can execute your own logic during specific events. To learn more, go to the Hooks documentation.

Admin Options
The behavior of Collections within the Admin Panel can be fully customized to fit the needs of your application. This includes grouping or hiding their navigation links, adding Custom Components, selecting which fields to display in the List View, and more.

To configure Admin Options for Collections, use the admin property in your Collection Config:

import type { CollectionConfig } from 'payload'

export const MyCollection: CollectionConfig = {
// ...
admin: {

    // ...

},
}
The following options are available:

Option

Description

group

Text or localization object used to group Collection and Global links in the admin navigation. Set to false to hide the link from the navigation while keeping its routes accessible.

hidden

Set to true or a function, called with the current user, returning true to exclude this Collection from navigation and admin routing.

hooks

Admin-specific hooks for this Collection. More details.

useAsTitle

Specify a top-level field to use for a document title throughout the Admin Panel. If no field is defined, the ID of the document is used as the title.

description

Text to display below the Collection label in the List View to give editors more information. Alternatively, you can use the admin.components.Description to render a React component. More details.

defaultColumns

Array of field names that correspond to which columns to show by default in this Collection's List View.

disableCopyToLocale

Disables the "Copy to Locale" button while editing documents within this Collection. Only applicable when localization is enabled.

groupBy

Beta. Enable grouping by a field in the list view.

hideAPIURL

Hides the "API URL" meta field while editing documents within this Collection.

enableRichTextLink

The Rich Text field features a Link element which allows for users to automatically reference related documents within their rich text. Set to true by default.

enableRichTextRelationship

The Rich Text field features a Relationship element which allows for users to automatically reference related documents within their rich text. Set to true by default.

folders

A boolean to enable folders for a given collection. Defaults to false. More details.

meta

Page metadata overrides to apply to this Collection within the Admin Panel. More details.

preview

Function to generate preview URLs within the Admin Panel that can point to your app. More details.

livePreview

Enable real-time editing for instant visual feedback of your front-end application. More details.

components

Swap in your own React components to be used within this Collection. More details.

listSearchableFields

Specify which fields should be searched in the List search view. More details.

pagination

Set pagination-specific options for this Collection in the List View. More details.

baseFilter

Defines a default base filter which will be applied to the List View (along with any other filters applied by the user) and internal links in Lexical Editor,

Note: If you set useAsTitle to a relationship or join field, it will use only the ID of the related document(s) as the title. To display a specific field (i.e. title) from the related document instead, create a virtual field that extracts the desired data, and set useAsTitle to that virtual field.

Custom Components
Collections can set their own Custom Components which only apply to Collection-specific UI within the Admin Panel. This includes elements such as the Save Button, or entire layouts such as the Edit View.

To override Collection Components, use the admin.components property in your Collection Config:

import type { CollectionConfig } from 'payload'

export const MyCollection: CollectionConfig = {
// ...
admin: {
components: {

      // ...
    },

},
}
The following options are available:

Option

Description

afterList

An array of components to inject after the built-in List View. More details.

afterListTable

An array of components to inject after the built-in List View's table. More details.

beforeList

An array of components to inject before the built-in List View. More details.

beforeListTable

An array of components to inject before the built-in List View's table. More details.

listMenuItems

An array of components to render within a menu next to the List Controls (after the Columns and Filters options)

Description

A component to render below the Collection label in the List View. An alternative to the admin.description property. More details.

edit

Override specific components within the Edit View. More details.

views

Override or create new views within the Admin Panel. More details.

Edit View Options
import type { CollectionConfig } from 'payload'

export const MyCollection: CollectionConfig = {
// ...
admin: {
components: {
edit: {

        // ...
      },
    },

},
}
The following options are available:

Option

Description

beforeDocumentControls

Inject custom components before the Save / Publish buttons. More details.

editMenuItems

Inject custom components within the 3-dot menu dropdown located in the document controls bar. More details.

SaveButton

Replace the default Save Button within the Edit View. Drafts must be disabled. More details.

SaveDraftButton

Replace the default Save Draft Button within the Edit View. Drafts must be enabled and autosave must be disabled. More details.

PublishButton

Replace the default Publish Button within the Edit View. Drafts must be enabled. More details.

PreviewButton

Replace the default Preview Button within the Edit View. Preview must be enabled. More details.

Upload

Replace the default Upload component within the Edit View. Upload must be enabled. More details.

Note: For details on how to build Custom Components, see Building Custom Components.

Pagination
All Collections receive their own List View which displays a paginated list of documents that can be sorted and filtered. The pagination behavior of the List View can be customized on a per-Collection basis, and uses the same Pagination API that Payload provides.

To configure pagination options, use the admin.pagination property in your Collection Config:

import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
// ...
admin: {
pagination: {
defaultLimit: 10,
limits: [10, 20, 50],
},
},
}
The following options are available:

Option

Description

defaultLimit

Integer that specifies the default per-page limit that should be used. Defaults to 10.

limits

Provide an array of integers to use as per-page options for admins to choose from in the List View.

List Searchable Fields
In the List View, there is a "search" box that allows you to quickly find a document through a simple text search. By default, it searches on the ID field. If defined, the admin.useAsTitle field is used. Or, you can explicitly define which fields to search based on the needs of your application.

To define which fields should be searched, use the admin.listSearchableFields property in your Collection Config:

import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
// ...
admin: {
listSearchableFields: ['title', 'slug'],
},
}
Tip: If you are adding listSearchableFields, make sure you index each of these fields so your admin queries can remain performant.

GraphQL
You can completely disable GraphQL for this collection by passing graphQL: false to your collection config. This will completely disable all queries, mutations, and types from appearing in your GraphQL schema.

You can also pass an object to the collection's graphQL property, which allows you to define the following properties:

Option

Description

singularName

Override the "singular" name that will be used in GraphQL schema generation.

pluralName

Override the "plural" name that will be used in GraphQL schema generation.

disableQueries

Disable all GraphQL queries that correspond to this collection by passing true.

disableMutations

Disable all GraphQL mutations that correspond to this collection by passing true.

TypeScript
You can import types from Payload to help make writing your Collection configs easier and type-safe. There are two main types that represent the Collection Config, CollectionConfig and SanitizedCollectionConfig.

The CollectionConfig type represents a raw Collection Config in its full form, where only the bare minimum properties are marked as required. The SanitizedCollectionConfig type represents a Collection Config after it has been fully sanitized. Generally, this is only used internally by Payload.

import type { CollectionConfig, SanitizedCollectionConfig } from 'payload'
