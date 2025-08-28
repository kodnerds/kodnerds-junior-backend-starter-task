import { getId, readData, writeData } from "../utils/fileHandler.js";

export const getAllData = async (page: number = 1, limit: number = 10) => {
  try {
    const data = await readData();

    const total = data.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    const results = data.slice(start, end);
    if (data.length === 0) {
      return {
        code: 400,
        success: false,
        message: "Data not available",
        data: null,
      };
    }

    return {
      code: 200,
      success: true,
      message: "Data retrieved successfully",
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: end < total,
      hasPrev: page > 1,
      data: results,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failure to get all documents";
    return {
      code: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

export const getDataById = async (id: number) => {
  try {
    const data = await readData();
    if (!id) {
      return {
        code: 404,
        success: false,
        message: "Provide data ID",
        data: null,
      };
    }
    return data.find((d: any) => d.id === id);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
    return {
      code: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

export const addData = async (data: {title: string;author: string;date: string;description: string;image: string;views: number;comment: number;likes: number;readMore: string;}) => {
  try {
    const datum = await readData();
    const newDatum = {
      id: getId(datum),
      author: data.author,
      date: data.date,
      title: data.title,
      description: data.description,
      image: data.image,
      comments: data.comment,
      views: data.views,
      likes: data.likes,
      readMore: data.readMore,
    };
    datum.push(newDatum);
    await writeData(datum);
    return {
        code:201,
        success:true,
        message:"New data added successfully",
        data:newDatum
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
    return {
      code: 500,
      success: false,
      message: errorMessage,
      data: null,
    };   
  }
};

export const updateData = async (id: number, updates: any) => {
  try {
    const data = await readData();
    const index = data.findIndex((set: any) => set.id === id);
    if (index === -1) return null;
  
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        data[index][key] = updates[key];
      }
    });
  
    await writeData(data);

    return {
        code:200,
        success:true,
        message:"Data updated successfully",
        Updated:data[index]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
    return {
      code: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

export const deleteData = async (id: number) => {
  try {
    let data = await readData();
    if (!id) {
        return{
            code:404,
            success:false,
            message:"No id provided",
            data:null
        }
    }
    const datum = data.find((set: any) => set.id === id);
    if (!datum) {
      return {
        code: 404,
        success: false,
        message: "Data not found",
        data: null,
      };
    }
  
    data = data.filter((d: any) => d.id !== id);
    await writeData(data);
    return {
        code:200,
        success:true,
        message:"Data deleted successfully",
        Deleted:datum
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
    return {
      code: 500,
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
