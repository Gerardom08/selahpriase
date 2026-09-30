import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddCancionModalComponent } from './add-cancion-modal.component';
import { CancionService } from '../../../components/services/cancion.service';
import { I18nModule } from '../../../shared/i18n/i18n.module';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { ToasterService } from '../../../shared/utils/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';

describe('AddCancionModalComponent', () => {
  let component: AddCancionModalComponent;
  let fixture: ComponentFixture<AddCancionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCancionModalComponent],
      imports: [CommonModule, ReactiveFormsModule, I18nModule],
      providers: [
        { provide: CancionService, useValue: {} },
        { provide: ToasterService, useValue: {} },
        { provide: I18nService, useValue: { getTranslation: (key: string) => key } },
        { provide: NgxSpinnerService, useValue: { show: () => undefined, hide: () => undefined } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCancionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
