<script setup lang="ts">
import { ref, watch } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useIssueMutation } from '../composables/useIssueMutation';

interface Emits {
    (event: 'onClose'): void;
}

interface Props {
    isOpen: boolean;
    labels: string[];
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isOpen = ref<boolean>(false);
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(props, () => {
    isOpen.value = props.isOpen;
});

watch(
    () => issueMutation.isSuccess.value,
    (isSucces) => {
        if (isSucces) {
            title.value = '';
            body.value = '';
            labels.value = [];

            issueMutation.reset();
            emits('onClose');
        }
    }
);
</script>
<template>
    <q-dialog v-model="isOpen" persistent>
        <q-card class="my-modal">
            <q-form @submit="issueMutation.mutate({ title, body, labels })">
                <q-linear-progress :value="1" color="primary" />
                <q-card-section class="columns no-wrap">
                    <div>
                        <div class="text-weight-bold">New Issue</div>
                        <div class="text-grey">Add new issue with labels</div>
                    </div>
                    <q-space />
                    <div class="q-pt-md">
                        <q-input
                            v-model="title"
                            type="text"
                            label="Title"
                            filled
                            class="q-mt-md"
                            dense
                            :rules="[(val) => !!val || 'Title is required']"
                        />
                        <q-select
                            v-model="labels"
                            :options="props.labels"
                            filled
                            multiple
                            use-chips
                            stack-label
                            label="Multiple selection"
                            class="q-mt-md"
                            dense
                        />
                        <MdEditor
                            v-model="body"
                            class="q-mt-md"
                            placeholder="# Markdown"
                            language="en-US"
                        />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn
                        :disable="issueMutation.isLoading.value"
                        @click="emits('onClose')"
                        flat
                        label="Cancel"
                        color="dark"
                        v-close-popup
                    />
                    <q-space />
                    <q-btn
                        :disable="issueMutation.isLoading.value"
                        type="submit"
                        flat
                        label="Add issue"
                        color="dark"
                    />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.my-modal {
    max-width: 900px;
}
</style>
