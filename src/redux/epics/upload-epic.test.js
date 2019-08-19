import { of } from "rxjs";
import "rxjs/add/operator/toArray";
import { EventEmitter } from "events";

import uploadActions from "../actions/upload-actions";
import uploadEpic from "./upload-epic";


test("uploadFilesEpic filesActions.UPLOAD_FILES not directory", done => {
  const files = ["foo", "bar"];
  const masterHandle = "m1";
  const folder = "/";
  const isDirectory = false;

  const action$ = of(
    uploadActions.uploadFiles({ files, folder, masterHandle, isDirectory })

  const files = ["foo", "bar"];
  const masterHandle = "m1";
  const directory = "/";

  const action$ = of(
    uploadActions.uploadFiles({ files, directory, masterHandle })
  );
  const expected = files.map(file =>
    uploadActions.uploadFile({ file, directory, masterHandle })
  );

  uploadEpic(action$)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual(expected);
      done();
    });
});

test("uploadFilesEpic filesActions.UPLOAD_FILES directory", done => {
  const files = [
    { name: "foo", webkitRelativePath: "bar/foo/bar/image.png" },
    { name: "bar", webkitRelativePath: "bar/foo/bar/image.png" }
  ];
  const masterHandle = "m1";
  const folder = "/";
  const isDirectory = true;
  const directoryPath = "bar/foo/bar";

  const action$ = of(
    uploadActions.uploadFiles({ files, folder, masterHandle, isDirectory })
  );
  const expected = files.map(file =>
    uploadActions.uploadFile({
      file,
      folder: folder + directoryPath,
      masterHandle
    })
  );

  uploadEpic(action$)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual(expected);
      done();
    });
});

test("uploadFileEpic on success", done => {
  const file = { name: "f1" };
  const directory = "/";
  const upload = new EventEmitter();
  upload.handle = "h1";

  const masterHandle = {
    uploadFile: jest.fn(() => upload)
  };

  const action$ = of(
    uploadActions.uploadFile({ file, directory, masterHandle })
  );

  uploadEpic(action$).subscribe(actions => {
    expect(actions).toEqual(
      uploadActions.uploadSuccess({ masterHandle, directory })
    );
    done();
  });

  upload.emit("finish");
});

test("uploadFileEpic on failure", done => {
  const file = { name: "f1" };
  const upload = new EventEmitter();
  const directory = "/";
  upload.handle = "h1";
  const error = new Error("foobar");

  const masterHandle = {
    uploadFile: jest.fn(() => upload)
  };

  const action$ = of(
    uploadActions.uploadFile({ file, directory, masterHandle })
  );

  uploadEpic(action$).subscribe(actions => {
    expect(actions).toEqual(
      uploadActions.uploadError({ handle: "h1", filename: "f1", error })
    );
    done();
  });

  upload.emit("error", error);
});
