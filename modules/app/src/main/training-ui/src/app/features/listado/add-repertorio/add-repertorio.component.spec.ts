import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { AddRepertorioComponent } from './add-repertorio.component';
import { CancionService } from '../../../components/services/cancion.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { I18nModule } from '../../../shared/i18n/i18n.module';
import { ToasterService } from '../../../shared/utils/toaster.service';

describe('AddRepertorioComponent', () => {
  let component: AddRepertorioComponent;
  let fixture: ComponentFixture<AddRepertorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRepertorioComponent],
      imports: [CommonModule, ReactiveFormsModule, I18nModule],
      providers: [
        provideRouter([]),
        { provide: CancionService, useValue: {} },
        { provide: ToasterService, useValue: {} },
        { provide: I18nService, useValue: { getTranslation: (key: string) => key } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRepertorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
