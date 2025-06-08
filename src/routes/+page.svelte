<script lang="ts">
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
    import Plus from "@lucide/svelte/icons/plus";
    import Layers from "@lucide/svelte/icons/layers";
    import { toast } from "svelte-sonner";

    let authenticators = $state([
        {
            name: "Google",
            issuer: "Google",
            account: "user@example.com",
            code: "696420",
        },
    ]);

    let copyIconStates: boolean[] = $state([]);

    function setCopyIcon(index: number, state: boolean) {
        copyIconStates[index] = state;
    }
</script>

<div class="flex flex-col min-h-screen">
    <div
        class="flex p-3 pl-4 gap-3 flex-col md:flex-row items-center border-b-border border-b-1 sticky top-0 bg-background"
    >
        <div class="flex flex-row gap-3 w-full items-center">
            <Layers />
            WebTOTP
            <Select.Root type="single">
                <Select.Trigger class="w-full md:w-[180px]"
                    >Vault 1</Select.Trigger
                >
                <Select.Content>
                    <Select.Item value="valut1">Valut 1</Select.Item>
                    <Select.Item value="valut2">Valut 2</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
        <div class="flex flex-row gap-3 w-full items-center">
            <Input placeholder="Search" />
            <Button size="icon" variant="outline"
                ><span class="sr-only">Settings</span><Settings /></Button
            >
            <Button size="icon" variant="outline"
                ><span class="sr-only">Add</span><Plus /></Button
            >
            <Button size="icon" variant="outline"
                ><span class="sr-only">Lock</span><Lock /></Button
            >
        </div>
    </div>

    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-3 gap-3"
    >
        {#each authenticators as authenticator, index}
            <Card.Root class="relative overflow-hidden">
                <div
                    class="absolute w-40 h-40 -top-20 opacity-20 -left-20 rounded-full blur-2xl"
                ></div>
                <Card.Header class="flex flex-row">
                    <div class="flex flex-col gap-2 grow">
                        <Card.Title>{authenticator.name}</Card.Title>
                        <Card.Description
                            >{(!(authenticator.name == authenticator.issuer) &&
                                authenticator.issuer + "\n") ||
                                ""}
                            {authenticator.account}</Card.Description
                        >
                    </div>
                    <Button variant="ghost" size="icon"
                        ><span class="sr-only">Edit</span><Pen /></Button
                    >
                    <Button variant="ghost" size="icon"
                        ><span class="sr-only">Delete</span><Trash /></Button
                    >
                </Card.Header>
                <Card.Content class="flex flex-row">
                    <div class="text-3xl grow font-mono tracking-wider">
                        {#if authenticator.code.length === 6}
                            {authenticator.code.slice(0, 3)}
                            {authenticator.code.slice(3)}
                        {:else if authenticator.code.length === 8}
                            {authenticator.code.slice(0, 4)}
                            {authenticator.code.slice(4)}
                        {:else}
                            {authenticator.code}
                        {/if}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onclick={() => {
                            navigator.clipboard
                                .writeText(authenticator.code)
                                .then(() => {
                                    setCopyIcon(index, true);
                                    toast.success("Copied!");
                                })
                                .catch((error) =>
                                    toast.error("Failed to copy", error),
                                );
                        }}
                        onmouseout={() =>
                            setTimeout(() => setCopyIcon(index, false), 500)}
                    >
                        <Clipboard
                            class="duration-300 {copyIconStates[index]
                                ? 'scale-0'
                                : 'scale-100'}"
                        />
                        <Check
                            class="duration-300 absolute {copyIconStates[index]
                                ? 'scale-100'
                                : 'scale-0'}"
                        />
                        <span class="sr-only">Copy</span>
                    </Button>
                </Card.Content>
            </Card.Root>
        {/each}
    </div>

    <div
        class="flex mt-auto p-3 gap-3 border-t-1 border-t-border items-center justify-center"
    >
        Made with love by Ingo
        <Button
            href="https://github.com/Inglan/webtotp"
            target="_blank"
            variant="outline"
        >
            <Git />Open Source
        </Button>
    </div>
</div>
