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
    <my-alert type="success" description="Success alert" />
    <my-alert type="info" description="Info alert" />
    <my-alert type="warning" description="Warning alert" />
    <my-alert type="danger" description="Error alert" />
  </div>
</template>
