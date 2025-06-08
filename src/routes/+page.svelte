<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    import Lock from "@lucide/svelte/icons/lock";
    import Settings from "@lucide/svelte/icons/settings";
    import Pen from "@lucide/svelte/icons/pen";
    import Trash from "@lucide/svelte/icons/trash";
    import Clipboard from "@lucide/svelte/icons/clipboard";
    import Check from "@lucide/svelte/icons/check";
    import Git from "@lucide/svelte/icons/folder-git-2";
</script>

<div
    class="flex p-3 gap-3 flex-col md:flex-row items-center border-b-border border-b-1"
>
    <div class="flex flex-row gap-3 w-full">
        <div class="text-xl">WebTOTP</div>
        <Button
            size="icon"
            variant="outline"
            href="https://github.com/Inglan/WebTOTP"
            target="_blank"><Git /></Button
        >
        <Select.Root type="single">
            <Select.Trigger class="w-full md:w-[180px]">Vault 1</Select.Trigger>
            <Select.Content>
                <Select.Item value="valut1">Valut 1</Select.Item>
                <Select.Item value="valut2">Valut 2</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
    <div class="flex flex-row gap-3 w-full">
        <Input placeholder="Search" />
        <Button size="icon" variant="outline"><Settings /></Button>
        <Button><Lock />Lock</Button>
    </div>
</div>

<div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-3 gap-3"
>
    {#each [1, 2, 3, 4, 5] as id}
        <Card.Root>
            <Card.Header class="flex flex-row">
                <div class="flex flex-col gap-2 grow">
                    <Card.Title>Authenticator {id}</Card.Title>
                    <Card.Description>Account name</Card.Description>
                </div>
                <Button variant="ghost" size="icon"><Pen /></Button>
                <Button variant="ghost" size="icon"><Trash /></Button>
            </Card.Header>
            <Card.Content class="flex flex-row">
                <div class="text-3xl grow">696-420</div>
                <Button variant="ghost" size="icon">
                    <Clipboard class="duration-100" />
                    <Check class="duration-100 absolute scale-0" />
                </Button>
            </Card.Content>
        </Card.Root>
    {/each}
</div>
