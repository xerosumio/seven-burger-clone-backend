<template>
  <el-container>
    <el-header
      >Header
      <el-button type="info" @click="clicklogout">退出</el-button></el-header
    >
    <el-container>
      <el-aside>Aside</el-aside>
      <el-main>
        <el-input v-model="title" type="text" placeholder="title" />
        <el-input v-model="subtitle" type="text" placeholder="subtitle" />
        <el-input v-model="description" type="text" placeholder="description" />
        <el-select v-model="type" placeholder="type" style="width: 115px">
          <el-option label="pizza" value="pizza" />
          <el-option label="burger" value="burger" />
          <el-option label="desserts" value="desserts" />
          <el-option label="drinks" value="drinks" />
        </el-select>
        <el-input
          v-if="type != 'pizza'"
          v-model="price"
          type="text"
          placeholder="price"
        />
        <el-input
          v-if="type == 'pizza'"
          v-model="pizzaSize20"
          type="text"
          placeholder="pizzaSize20"
        />
        <el-input
          v-if="type == 'pizza'"
          v-model="pizzaSize30"
          type="text"
          placeholder="pizzaSize30"
        />
        <el-input
          v-if="type == 'pizza'"
          v-model="pizzaSize40"
          type="text"
          placeholder="pizzaSize40"
        />
        <el-select
          v-model="variousType"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option label="popular" value="popular" />
          <el-option label="topWeek" value="topWeek" />
        </el-select>
        <div>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img
            :src="imageUrl"
            v-if="imageUrl"
            style="width: 200px; height: 200px"
          />
        </div>

        <el-button type="info" @click="add">添加</el-button>
        <div>内容</div>
        <el-table :data="ListDocument" style="width: 100%">
          <el-table-column fixed prop="title" label="title" width="180" />
          <el-table-column
            show-overflow-tooltip
            prop="subtitle"
            label="subtitle"
            width="180"
          />
          <el-table-column
            show-overflow-tooltip
            prop="description"
            label="description"
            width="180"
          />
          <el-table-column prop="price" label="price" />
          <el-table-column prop="pizzaSize20" label="pizzaSize20" />
          <el-table-column prop="pizzaSize30" label="pizzaSize30" />
          <el-table-column prop="pizzaSize40" label="pizzaSize40" />
          <el-table-column prop="type" label="type" />
          <el-table-column prop="variousType" label="variousType" />
          <el-table-column prop="isHeart" label="isHeart" />
          <el-table-column label="Image">
            <template #default="scope">
              <img :src="scope.row.imgData" width="50" height="50" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="clickDelete(scope.row)"
                >Delete</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="clickEdit(scope.row)"
                >Edit</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="Edit">
          <el-form :model="form">
            <el-form-item label="title" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="subtitle" :label-width="formLabelWidth">
              <el-input v-model="form.subtitle" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
              <el-input v-model="form.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="type" :label-width="formLabelWidth">
              <el-select
                v-model="form.type"
                placeholder="type"
                style="width: 115px"
              >
                <el-option label="pizza" value="pizza" />
                <el-option label="burger" value="burger" />
                <el-option label="desserts" value="desserts" />
                <el-option label="drinks" value="drinks" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.type != 'pizza'"
              label="price"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.price" autocomplete="off" />
            </el-form-item>
            <el-form-item
              v-if="form.type == 'pizza'"
              label="pizzaSize20"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.pizzaSize20" autocomplete="off" />
            </el-form-item>
            <el-form-item
              v-if="form.type == 'pizza'"
              label="pizzaSize30"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.pizzaSize30" autocomplete="off" />
            </el-form-item>
            <el-form-item
              v-if="form.type == 'pizza'"
              label="pizzaSize40"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.pizzaSize40" autocomplete="off" />
            </el-form-item>

            <el-form-item label="variousType" :label-width="formLabelWidth">
              <el-select
                v-model="form.variousType"
                multiple
                placeholder="Select"
                style="width: 240px"
              >
                <el-option label="popular" value="popular" />
                <el-option label="topWeek" value="topWeek" />
              </el-select>
            </el-form-item>
            <el-form-item label="img" :label-width="formLabelWidth">
              <div><img :src="form.imgData" width="80" height="80" /></div>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :show-file-list="false"
                :before-upload="beforeUpdataUpload"
              >
                <el-button size="small" type="primary">点击修改</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="clickConfirm">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { userAppwriteAccount } from "@/appwrite/userAppwriteAccount.js";
import { userAppwriteDB } from "@/appwrite/userAppwriteDB.js";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
const { logout } = userAppwriteAccount();
const {
  doCreateDocument,
  doListDocument,
  doListFiles,
  doGetFilePreview,
  doCreateFile,
  doDeleteDocument,
  doDeleteFile,
  doUpdateDocument,
  doUpdateFile,
} = userAppwriteDB();
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();
const userId = computed(() => {
  return localStorage.getItem("userId");
});
const ListDocument = ref([]);
onMounted(async () => {
  const data = await doListDocument();
  ListDocument.value = data?.documents;
});
const clicklogout = async () => {
  try {
    const logoutResp = await logout();
    if (logoutResp?.error) {
      throw logoutResp?.error;
    } else {
      router.push({
        path: "/",
      });
    }
  } catch (e) {
    console.log(e);
    return;
  }
};
const title = ref();
const subtitle = ref();
const description = ref();
const price = ref();
const pizzaSize20 = ref();
const pizzaSize30 = ref();
const pizzaSize40 = ref();
const type = ref("pizza");
const variousType = ref();
const imageUrl = ref();
const imgID = ref();
const uploadUrl = "https://example.com/upload";
const fileData = ref();
const beforeUpload = async (file) => {
  fileData.value = file;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    imageUrl.value = event.target.result;
  };

  return false;
};

const add = async () => {
  try {
    const fileID = await doCreateFile(fileData.value);
    imgID.value = fileID.$id;
    const imgData = await doGetFilePreview(imgID.value);
    const data = {
      title: title.value,
      subtitle: subtitle.value,
      description: description.value,
      price: price.value,
      pizzaSize20: pizzaSize20.value,
      pizzaSize30: pizzaSize30.value,
      pizzaSize40: pizzaSize40.value,
      type: type.value,
      variousType: variousType.value,
      isHeart: false,
      imgID: imgID.value,
      imgData: imgData.href,
    };

    const logoutResp = await doCreateDocument(data, userId.value);
    const doListDocumentData = await doListDocument();
    ListDocument.value = doListDocumentData?.documents;
    if (logoutResp?.error) {
      throw logoutResp?.error;
    }
    ElMessage({
      showClose: true,
      message: "successfully add!",
      type: "success",
    });
  } catch (e) {
    console.log(e);
    return;
  }
};
const clickDelete = async (e) => {
  try {
    await doDeleteDocument(e.$id);
    await doDeleteFile(e.imgID);
    const doListDocumentData = await doListDocument();
    ListDocument.value = doListDocumentData?.documents;
    ElMessage({
      showClose: true,
      message: "successfully deleted!",
      type: "success",
    });
  } catch (e) {
    console.log(e);
    return;
  }
};
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  id: "",
  title: "",
  subtitle: "",
  description: "",
  price: "",
  pizzaSize20: "",
  pizzaSize30: "",
  pizzaSize40: "",
  type: "pizza",
  variousType: "",
  imgID: "",
  imgData: "",
});
const fileUpdataData = ref();
const beforeUpdataUpload = async (file) => {
  fileUpdataData.value = file;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    form.imgData = event.target.result;
  };

  return false;
};
const clickEdit = (e) => {
  dialogFormVisible.value = true;
  form.id = e.$id;
  form.title = e.title;
  form.subtitle = e.subtitle;
  form.description = e.description;
  form.price = e.price;
  form.pizzaSize20 = e.pizzaSize20;
  form.pizzaSize30 = e.pizzaSize30;
  form.pizzaSize40 = e.pizzaSize40;
  form.type = e.type;
  form.variousType = e.variousType;
  form.imgData = e.imgData;
  form.imgID = e.imgID;
};
const clickConfirm = async () => {
  try {
    await doDeleteFile(form.imgID);
    const fileID = await doCreateFile(fileUpdataData.value);
    const imgData = await doGetFilePreview(fileID.$id);
    await doUpdateDocument(form.id, {
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      price: form.price,
      pizzaSize20: form.pizzaSize20,
      pizzaSize30: form.pizzaSize30,
      pizzaSize40: form.pizzaSize40,
      type: form.type,
      variousType: form.variousType,
      imgID: fileID.$id,
      imgData: imgData.href,
    });
    const doListDocumentData = await doListDocument();
    ListDocument.value = doListDocumentData?.documents;
    dialogFormVisible.value = false;
    ElMessage({
      showClose: true,
      message: "successfully update!",
      type: "success",
    });
  } catch (e) {
    console.log(e);
    return;
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";
.el {
  &-header {
    background-color: #abe5ff;
  }

  &-container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  &-aside {
    width: 150px;
    background-color: #abe5ff;
  }

  &-main {
    width: 100%;
    background-color: #abe5ff;
  }
}
</style>
