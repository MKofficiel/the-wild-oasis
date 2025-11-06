import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.error(newCabin, id);

  // Pour verifier si on garde lancienne image
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath, "path");

  //Create image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // on check si ya pas dimage path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(imagePath, "image path");
  // 1. Create cabin

  let query = supabase.from("cabins");

  // A CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B Edit Cabin

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image

  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading file
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);

    throw new Error("Cabin image could no be uploaded cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);

    throw new Error("Cabin could not be deleted");
  }

  return data;
}
