<template>
    <div>
        <ChangeTable />
        <TableFilter />
    </div>
</template>

<script>
import ChangeTable from '@/components/ChangesList/ChangeTable/ChangeTable'
import TableFilter from '@/components/ChangesList/TableFilter/TableFilter'
    export default {
        components:{
            ChangeTable,
            TableFilter
        }
    }
</script>

<style lang="scss" scoped>

</style>