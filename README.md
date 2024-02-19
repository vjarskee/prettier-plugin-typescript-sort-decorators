<h2 align="center">Prettier Plugin <b>Typescript Sort Decorators</b></h2>

## 📙 Description

A simple plugin for Prettier that allows you to automatically sort decorators in TypeScript code.

⚠️ <b>WARNING: The plugin was designed primarily to work with NestJS controllers and has not been tested in other environments.</b>

The plugin can sort multiple decorators over a function like this:

```typescript
@ApiForbiddenResponse({ description: '403' })
@Get()
@UseGuards(AdminGuard)
@ApiOkResponse({ type: Entity })
```

Multiple arguments in a function if each has one decorator like this:

```typescript
async editEntity(@Body() body: EditEntityDto, @Param('id') id: number): Promise<Entity> {}
```

As well as multiple decorators before a single function argument:

```typescript
async editEntity(@Query('id') @Param('id') id: number): Promise<Entity> {}
```

The second and third modes are incompatible with each other (<i>Will it be in future versions? Is it necessary?</i>).

In other words, plugin format this:

```typescript
@ApiForbiddenResponse({ description: '403' })
@Get()
@UseGuards(AdminGuard)
@ApiOkResponse({ type: Entity })
@ApiOperation({ summary: 'Get All Entities' })
async getAllEntities(): Promise<Entity[]> {
  return this.entityService.getAllEntities()
}

@ApiCreatedResponse({ type: Entity })
@ApiForbiddenResponse({ description: '403' })
@Post()
@ApiOperation({ summary: 'Create new entity' })
@UseGuards(AdminGuard)
async createEntity(@Body() body: CreateEntityDto): Promise<Entity> {
  return this.entityService.createEntity(body)
}

@Put(':id')
@ApiOkResponse({ type: Entity })
@UseGuards(AdminGuard)
@ApiOperation({ summary: 'Edit entity' })
@ApiForbiddenResponse({ description: '403' })
async editEntity(@Body() body: EditEntityDto, @Param('id') id: number): Promise<Entity> {
  return this.entityService.editEntity(id, body)
}
```

...into something like this:

```typescript
@Get()
@UseGuards(AdminGuard)
@ApiOperation({ summary: 'Get All Entities' })
@ApiOkResponse({ type: Entity })
@ApiForbiddenResponse({ description: '403' })
async getAllEntities(): Promise<Entity[]> {
  return this.entityService.getAllEntities()
}

@Post()
@UseGuards(AdminGuard)
@ApiOperation({ summary: 'Create new entity' })
@ApiCreatedResponse({ type: Entity })
@ApiForbiddenResponse({ description: '403' })
async createEntity(@Body() body: CreateEntityDto): Promise<Entity> {
  return this.entityService.createEntity(body)
}

@Put(':id')
@UseGuards(AdminGuard)
@ApiOperation({ summary: 'Edit entity' })
@ApiOkResponse({ type: Entity })
@ApiForbiddenResponse({ description: '403' })
async editEntity(@Param('id') id: number, @Body() body: EditEntityDto): Promise<Entity> {
  return this.entityService.editEntity(id, body)
}
```

## ⚙️ Install

#### 1. Add dependency to your project

```bash
npm i -D prettier-plugin-typescript-sort-decorators
```

or

```bash
yarn add -D prettier-plugin-typescript-sort-decorators
```

#### 2. Add plugin to prettier config

```json
{
  "plugins": ["prettier-plugin-typescript-sort-decorators"]
}
```

#### 3. Keep customizing (next step)

## ✏️ Configuration

#### Parameters for your prettier config

<table>
  <thead>
    <tr>
      <td>Key</td>
      <td>Type</td>
      <td>Description</td>
      <td>Example</td>
      <td>Default value</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>functionDecoratorsSort</td>
      <td><code>boolean</code></td>
      <td>Whether to sort decorators that are not before function arguments</td>
      <td><code>true</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td>functionDecoratorsSortOrder</td>
      <td><code>string[]</code></td>
      <td>Sorting list of decorators are not before function arguments</td>
      <td><code>["Get", "Post", "Put", "Delete"]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>functionDecoratorsSortAlphabeticalUnlisted</td>
      <td><code>boolean</code></td>
      <td>Sort unlisted decorators not before function arguments alphabetically</td>
      <td><code>true</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorSingleSort</td>
      <td><code>boolean</code></td>
      <td>Whether to sort function arguments preceded by one decorator each</td>
      <td><code>true</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorSingleSortOrder</td>
      <td><code>string[]</code></td>
      <td>Sorting list of function arguments preceded by one decorator each</td>
      <td><code>["Param", "Body"]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorSingleSortAlphabeticalUnlisted</td>
      <td><code>boolean</code></td>
      <td>Sort unlisted function arguments preceded by one decorator alphabetically</td>
      <td><code>true</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorMultiSort</td>
      <td><code>boolean</code></td>
      <td>Sort decorators before the function argument when there are 2 or more of them</td>
      <td><code>false</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorMultiSortOrder</td>
      <td><code>string[]</code></td>
      <td>Sorting list of decorators before the function argument when there are 2 or more of them</td>
      <td><code>["Param", "Query"]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>paramsDecoratorMultiSortAlphabeticalUnlisted</td>
      <td><code>boolean</code></td>
      <td>Sort unlisted decorators before the function argument when there are 2 or more of them alphabetically</td>
      <td><code>true</code></td>
      <td><code>true</code></td>
    </tr>
  </tbody>
</table>

<b><code>"paramsDecoratorSingleSortOrder": true</code> and <code>"paramsDecoratorMultiSort": true</code> are incompatible with each other and will cause arguments decorators sorting to fail</b>

### Example of prettier configuration:

```json
{
  "plugins": ["prettier-plugin-typescript-sort-decorators"],

  "functionDecoratorsSort": true,
  "functionDecoratorsSortOrder": ["Get", "Post", "Put", "Delete"],
  "functionDecoratorsSortAlphabeticalUnlisted": true,

  "paramsDecoratorSingleSort": true,
  "paramsDecoratorSingleSortOrder": ["Param", "Body"],
  "paramsDecoratorSingleSortAlphabeticalUnlisted": true,

  "paramsDecoratorMultiSort": false,
  "paramsDecoratorMultiSortOrder": [],
  "paramsDecoratorMultiSortAlphabeticalUnlisted": true
}
```
