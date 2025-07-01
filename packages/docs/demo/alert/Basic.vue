<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <my-alert type="success">Success alert</my-alert>
    <my-alert type="info">Info alert</my-alert>
    <my-alert type="warning">Warning alert</my-alert>
    <my-alert type="danger">Error alert</my-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <my-alert type="success" title="Success alert" />
    <my-alert type="info" title="Info alert" />
    <my-alert type="warning" title="Warning alert" />
    <my-alert type="danger" title="Error alert" />
  </div>
</template>
